const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Holidays = require('../Models/HolidayList');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallHolidays', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const Holidays1 = await Holidays.find({school: req.user.id});
        res.json(Holidays1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddHolidays', fetchuser, [
    body('Announcement', 'Enter a valid Announcement').isLength({ min: 3 }),
    body('HolidayDescription', 'Enter a valid HolidayDescription').isLength({ min: 3 }),
    body('StartDate', 'Enter a valid start Date').isDate(),
    body('EndDate', 'Enter a valid End Date').isDate() ,], async (req, res) => {
        try {
            const { Announcement, HolidayDescription, StartDate, EndDate} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const holidays = new Holidays({
                Announcement, HolidayDescription, StartDate, EndDate, school: req.user.id
            })
            const savedholidays = await holidays.save()

            res.json(savedholidays)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateHolidays/:id', fetchuser, async (req, res) => {
    const { Announcement, HolidayDescription, StartDate, EndDate} = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (Announcement) { newNote.Announcement = Announcement };
        if (HolidayDescription) { newNote.HolidayDescription = HolidayDescription };
        // if (StartDate) { newNote.StartDate = StartDate };
        // if (EndDate) { newNote.EndDate = EndDate };

        // Find the note to be updated and update it
        let note = await Holidays.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Holidays.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteHoldays/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Holidays.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Holidays.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Holidays has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
