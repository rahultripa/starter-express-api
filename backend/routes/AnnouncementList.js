const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Announcement = require('../Models/Announcement');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallAnnouncement', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const Announcement1 = await Announcement.find({school: req.user.id});
        res.json(Announcement1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddAnnouncement', fetchuser, [
    body('AnnouncementPro', 'Enter a valid Announcement').isLength({ min: 1 }),
    body('AnnouncementDescription', 'Enter a valid Announcement Description').isLength({ min: 3 }),
], async (req, res) => {
        try {
            const { AnnouncementPro, AnnouncementDescription, Class, Section} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const Announcement1 = new Announcement({
                AnnouncementPro, AnnouncementDescription, school: req.user.id, Class,Section
            })
            const savedAnnouncement = await Announcement1.save()

            res.json(savedAnnouncement)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateAnnouncement/:id', fetchuser, async (req, res) => {
    const { AnnouncementPro, AnnouncementDescription} = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (AnnouncementPro) { newNote.Announcement = AnnouncementPro };
        if (AnnouncementDescription) { newNote.AnnouncementDescription = AnnouncementDescription  };
        // if (StartDate) { newNote.StartDate = StartDate };
        // if (EndDate) { newNote.EndDate = EndDate };

        // Find the note to be updated and update it
        let note = await Announcement.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Announcement.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteAnnouncement/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Announcement.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Announcement.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Announcement has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
