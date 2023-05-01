const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const SchoolImageGallaryCategory = require('../Models/SchoolImageGallaryCategory');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// // ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallSchoolImageGallaryCategory', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const SchoolImageGallaryCategory1 = await SchoolImageGallaryCategory.find({school: req.user.id});
        res.json(SchoolImageGallaryCategory1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddSchoolImageGallaryCategory', fetchuser, [
    body('GalleryName', 'Enter a valid GalleryName').isLength({ min: 1 })
  
                    ], async (req, res) => {
        try {
            const {GalleryName,GalleryDescription} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const SchoolImageGallaryCategory1 = new SchoolImageGallaryCategory({
                GalleryName:GalleryName,GalleryDescription:GalleryDescription,school: req.user.id
            })
            const savedSchoolImageGallaryCategory = await SchoolImageGallaryCategory1.save()

            res.json(savedSchoolImageGallaryCategory)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateSchoolImageGallaryCategory/:id', fetchuser, async (req, res) => {
    const {GalleryName,GalleryDescription } = req.body;
  try {
        // Create a newNote object
        const newNote = {};
        if (GalleryDescription) { newNote.GalleryDescription = GalleryDescription };
       
        if (GalleryName) { newNote.GalleryName = GalleryName };
      
        // Find the note to be updated and update it
        let note = await SchoolImageGallaryCategory.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await SchoolImageGallaryCategory.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteSchoolImageGallaryCategory/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await SchoolImageGallaryCategory.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await SchoolImageGallaryCategory.findByIdAndDelete(req.params.id)
        res.json({ "Success": "SchoolImageGallaryCategory has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
