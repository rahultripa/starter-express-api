const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const SchoolFacilities = require('../Models/SchoolFacilities');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// // ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallSchoolFacilities', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const SchoolFacilities1 = await SchoolFacilities.find({school: req.user.id});
        res.json(SchoolFacilities1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddSchoolFacilities', fetchuser, [
    body('Name', 'Enter a valid Name').isLength({ min: 1 }),
    body('Possition', 'Enter a valid OxySudentRemark Description').isLength({ min: 3 })
                    ], async (req, res) => {
        try {
            const {Class, Section,Name,Degree,Possition,Comment,Email,Mobile } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const SchoolFacilities1 = new SchoolFacilities({
                Class:Class, Section:Section,Name:Name,Degree:Degree,Possition:Possition,Comment:Comment,Email:Email,Mobile:Mobile , school: req.user.id
            })
            const savedSchoolFacilities = await SchoolFacilities1.save()

            res.json(savedSchoolFacilities)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateSchoolFacilities/:id', fetchuser, async (req, res) => {
    const {Class, Section,Name,Degree,Possition,Comment,Email,Mobile } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (Name) { newNote.Name = Name };
        if (Class) { newNote.Class = Class };
        if (Section) { newNote.Section = Section };
        if (Degree) { newNote.Degree = Degree };
        if (Possition) { newNote.Possition = Possition };
        if (Comment) { newNote.Comment = Comment };
        if (Email) { newNote.Email = Email };
        if (Mobile) { newNote.Mobile = Mobile };
    
        // Find the note to be updated and update it
        let note = await SchoolFacilities.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await SchoolFacilities.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteSchoolFacilities/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await SchoolFacilities.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await SchoolFacilities.findByIdAndDelete(req.params.id)
        res.json({ "Success": "SchoolFacilities has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
