const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Attendance = require('../Models/Attendance');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallAttendance', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const Attendance1 = await Attendance.find({school: req.user.id});
        res.json(Attendance1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddAttendance', fetchuser, async (req, res) => {
        try {
            const {  Class, Section,Student,IsPressent,ReasonofAbsent} = req.body;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const Attendance1 = new Attendance({
                Class:Class, Section:Section,Student:Student,IsPressent:IsPressent,ReasonofAbsent:ReasonofAbsent, school: req.user.id
            })
            const savedAttendance = await Attendance1.save()

            res.json(savedAttendance)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateAttendance/:id', fetchuser, async (req, res) => {
    const {  Class, Section,Student,IsPressent,ReasonofAbsent} = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (Student) { newNote.Student = Student };
        if (Class) { newNote.Class = Class };
        if (Section) { newNote.Section = Section };
        if (IsPressent) { newNote.IsPressent = IsPressent };
        if (ReasonofAbsent) { newNote.ReasonofAbsent = ReasonofAbsent };
       
        // Find the note to be updated and update it
        let note = await Attendance.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Attendance.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteAttendance/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Attendance.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Attendance.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Attendance has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
