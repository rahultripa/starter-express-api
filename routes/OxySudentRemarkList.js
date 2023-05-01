const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const OxySudentRemark = require('../Models/OxySudentRemark');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallOxySudentRemark', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const OxySudentRemark1 = await OxySudentRemark.find({school: req.user.id});
        res.json(OxySudentRemark1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddOxySudentRemark', fetchuser, [
    body('Term', 'Enter a valid Term').isLength({ min: 1 }),
    body('Class', 'Enter a valid OxySudentRemark Description').isLength({ min: 3 }),
        body('Subject', 'Enter a valid Subject Description').isLength({ min: 3 }),
            body('Section', 'Enter a valid Section Description').isLength({ min: 3 }),
                body('Student', 'Enter a valid Student Description').isLength({ min: 3 }),
                    body('MaxmumMarks', 'Enter a valid MaxmumMarks Description').isNumeric(),
                        body('CurrentMarks', 'Enter a valid CurrentMarks Description').isNumeric()
                    
                    ], async (req, res) => {
        try {
            const { Term, Class, Section,Subject,Student,MaxmumMarks,CurrentMarks,Remark} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const OxySudentRemark1 = new OxySudentRemark({
                Term:Term, Class:Class,Section:Section,Subject:Subject,Student:Student,MaxmumMarks:MaxmumMarks,CurrentMarks:CurrentMarks,Remark:Remark , school: req.user.id
            })
            const savedOxySudentRemark = await OxySudentRemark1.save()

            res.json(savedOxySudentRemark)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateOxySudentRemark/:id', fetchuser, async (req, res) => {
    const { Term, Class, Section,Subject,Student,MaxmumMarks,CurrentMarks,Remark} = req.body;
 try {
        // Create a newNote object
        const newNote = {};
        if (Term) { newNote.Term = Term };
        if (Class) { newNote.Class = Class };
        if (Section) { newNote.Section = Section };
        if (Subject) { newNote.Subject = Subject };
        if (Student) { newNote.Student = Student };
        if (MaxmumMarks) { newNote.MaxmumMarks = MaxmumMarks };
        if (CurrentMarks) { newNote.CurrentMarks = CurrentMarks };
        if (Remark) { newNote.Remark = Remark };

        // Find the note to be updated and update it
        let note = await OxySudentRemark.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await OxySudentRemark.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteOxySudentRemark/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await OxySudentRemark.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await OxySudentRemark.findByIdAndDelete(req.params.id)
        res.json({ "Success": "OxySudentRemark has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
