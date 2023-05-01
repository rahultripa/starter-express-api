const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const TimeTable = require('../Models/TimeTable');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallTimeTable', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const TimeTable1 = await TimeTable.find({school: req.user.id});
        res.json(TimeTable1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddTimeTable', fetchuser, [
   // body('TimeTable', 'Enter a valid Type').isLength({ min: 1 }),
    body('Class', 'Enter a valid TimeTable Description').isLength({ min: 3 }),
             body('Section', 'Enter a valid Section Description').isLength({ min: 3 })
                    ], async (req, res) => {
        try {
            const {Class, Section,StartTime,Type,Subject,EndTime,Days,Comment} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const TimeTable1 = new TimeTable({
                Class:Class, Section:Section,StartTime:StartTime,EndTime:EndTime,Days:Days,Comment:Comment,Subject:Subject, school: req.user.id
            })
            const savedTimeTable = await TimeTable1.save()

            res.json(savedTimeTable)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateTimeTable/:id', fetchuser, async (req, res) => {
    const {Class, Section,TimeTable,StartTime,Type,Subject,EndTime,Days,Comment} = req.body;  try {
        // Create a newNote object
        const newNote = {};
        //if (TimeTable) { newNote.TimeTable = TimeTable };
        if (Class) { newNote.Class = Class };
        if (Section) { newNote.Section = Section };
        if (StartTime) { newNote.StartTime = StartTime };
        if (Subject) { newNote.Subject = Subject };
        if (EndTime) { newNote.EndTime = EndTime };
        if (Days) { newNote.Days = Days };
        if (Comment) { newNote.Comment = Comment };
       
       
        // Find the note to be updated and update it
        let note = await TimeTable.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await TimeTable.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteTimeTable/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await TimeTable.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await TimeTable.findByIdAndDelete(req.params.id)
        res.json({ "Success": "TimeTable has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
