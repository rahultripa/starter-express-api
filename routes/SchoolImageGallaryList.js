const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const SchoolImageGallary = require('../Models/SchoolImageGallary');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// // ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallSchoolImageGallary', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const SchoolImageGallary1 = await SchoolImageGallary.find({school: req.user.id});
        res.json(SchoolImageGallary1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddSchoolImageGallary', fetchuser, [
    body('GalleryCaption', 'Enter a valid GalleryCaption').isLength({ min: 1 }),
    body('SchoolImageGallaryCategory', 'Enter a valid SchoolImageGallaryCategory').isLength({ min: 1 }),
    body('PhotoData', 'Enter a valid PhotoData Description').isLength({ min: 3 })
                    ], async (req, res) => {
        try {
            const {Class, Section,GalleryCaption,PhotoDescription,PhotoData,SchoolImageGallaryCategory } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const SchoolImageGallary1 = new SchoolImageGallary({
                Class:Class, Section:Section,GalleryCaption:GalleryCaption,PhotoData:PhotoData,SchoolImageGallaryCategory,PhotoDescription:PhotoDescription,school: req.user.id
            })
            const savedSchoolImageGallary = await SchoolImageGallary1.save()

            res.json(savedSchoolImageGallary)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateSchoolImageGallary/:id', fetchuser, async (req, res) => {
    const {Class, Section,GalleryCaption,PhotoData,SchoolImageGallaryCategory } = req.body;
  try {
        // Create a newNote object
        const newNote = {};
        if (GalleryCaption) { newNote.GalleryCaption = GalleryCaption };
      
        if (PhotoData) { newNote.PhotoData = PhotoData };
        if (SchoolImageGallaryCategory) { newNote.Possition = SchoolImageGallaryCategory };
      
        // Find the note to be updated and update it
        let note = await SchoolImageGallary.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await SchoolImageGallary.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteSchoolImageGallary/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await SchoolImageGallary.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await SchoolImageGallary.findByIdAndDelete(req.params.id)
        res.json({ "Success": "SchoolImageGallary has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
