const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const SchoolComplaintList = require('../Models/SchoolComplaint');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallSchoolComplaintList', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const SchoolComplaintList1 = await SchoolComplaintList.find({school: req.user.id});
        res.json(SchoolComplaintList1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddSchoolComplaintList', fetchuser, [
    body('Subject', 'Enter a valid Subject').isLength({ min: 1 }),
    body('Class', 'Enter a valid OxySudentRemark Description').isLength({ min: 3 }),
         body('Section', 'Enter a valid Section Description').isLength({ min: 3 }),
            body('Student', 'Enter a valid Student Description').isLength({ min: 3 }),

    body('Comment', 'Enter a valid Comment Description').isLength({ min: 3 }),
], async (req, res) => {
        try {
            const {  Class, Section,Subject,Student,Comment} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const SchoolComplaintList1 = new SchoolComplaintList({
                Subject:Subject,Class:Class,Section:Section,Student:Student, Comment:Comment, school: req.user.id
            })
            const savedSchoolComplaintList = await SchoolComplaintList1.save()

            res.json(savedSchoolComplaintList)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateSchoolComplaintList/:id', fetchuser, async (req, res) => {
    const { Class, ClassDescription} = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (SchoolComplaintList) { newNote.Class = SchoolComplaintList };
        if (SchoolComplaintListDescription) { newNote.SchoolComplaintListDescription = SchoolComplaintListDescription };
        // if (StartDate) { newNote.StartDate = StartDate };
        // if (EndDate) { newNote.EndDate = EndDate };

        // Find the note to be updated and update it
        let note = await SchoolComplaintList.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await SchoolComplaintList.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteSchoolComplaintList/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await SchoolComplaintList.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await SchoolComplaintList.findByIdAndDelete(req.params.id)
        res.json({ "Success": "SchoolComplaintList has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
