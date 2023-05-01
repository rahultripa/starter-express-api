const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const SectionInfo = require('../Models/SectionInfo');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallSectionInfo', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const SectionInfo1 = await SectionInfo.find({school: req.user.id});
        res.json(SectionInfo1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddSectionInfo', fetchuser, [
    body('Section', 'Enter a valid Section').isLength({ min: 1 },
       'Class', 'Enter a valid Class').isLength({ min: 1 })], async (req, res) => {
        try {
            const { Section,Class, SectionDescription} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const SectionInfo1 = new SectionInfo({
                Section,Class, SectionDescription, school: req.user.id
            })
            const savedSectionInfo = await SectionInfo1.save()

            res.json(savedSectionInfo)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateSectionInfo/:id', fetchuser, async (req, res) => {
    const { Section,Class , SectionDescription} = req.body;
    try {
        // Create a newNote object
        const newNote = {};

        if (Section) { newNote.Section = Section };
        if (Class) { newNote.Class = Class };
        if (SectionDescription) { newNote.SectionDescription = SectionDescription };
        // if (StartDate) { newNote.StartDate = StartDate };
        // if (EndDate) { newNote.EndDate = EndDate };

        // Find the note to be updated and update it
        let note = await SectionInfo.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await SectionInfo.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteSectionInfo/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await SectionInfo.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await SectionInfo.findByIdAndDelete(req.params.id)
        res.json({ "Success": "SectionInfo has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
