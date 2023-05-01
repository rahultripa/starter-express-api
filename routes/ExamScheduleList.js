const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const ExamSchedule = require('../Models/ExamSchedule');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallExamSchedule', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const ExamSchedule1 = await ExamSchedule.find({school: req.user.id});
        res.json(ExamSchedule1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddExamSchedule', fetchuser, [
    body('Term', 'Enter a valid ExamSchedule').isLength({ min: 1 },
    body('Class', 'Enter a valid Class Description').isLength({ min: 3 }),
        body('StartDate', 'Enter a valid StartDate ').isDate()),
        body('EndDate', 'Enter a valid EndDate ').isDate()
        
], async (req, res) => {
        try {
            const { Term, Class, Section,Subject,StartDate,EndDate} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const ExamSchedule1 = new ExamSchedule({
                Term:Term, Class:Class,Section:Section,Subject:Subject,StartDate:StartDate,EndDate:EndDate, school: req.user.id
            })
            const savedExamSchedule = await ExamSchedule1.save()

            res.json(savedExamSchedule)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateExamSchedule/:id', fetchuser, async (req, res) => {
    const { Term, Class, Section,Subject,StartDate,EndDate} = req.body;

    try {
        // Create a newNote object
        const newNote = {};
        if (Term) { newNote.Term = Term };
        if (Class) { newNote.Class = Class };
        if (Section) { newNote.Section = Section };
        if (Subject) { newNote.Subject = Subject };
        if (StartDate) { newNote.StartDate = StartDate };
        if (EndDate) { newNote.EndDate = EndDate };

        // Find the note to be updated and update it
        let note = await ExamSchedule.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await ExamSchedule.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteExamSchedule/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await ExamSchedule.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await ExamSchedule.findByIdAndDelete(req.params.id)
        res.json({ "Success": "ExamSchedule has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
