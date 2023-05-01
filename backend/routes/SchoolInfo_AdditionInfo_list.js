const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const SchoolInfo_AdditionInfo = require('../Models/SchoolInfo_AdditionInfo');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
 // ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallSchoolInfo_AdditionInfo', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const SchoolInfo_AdditionInfo1 = await SchoolInfo_AdditionInfo.find({school: req.user.id});
        res.json(SchoolInfo_AdditionInfo1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddSchoolInfo_AdditionInfo', fetchuser, async (req, res) => {
        try {
            const {HeaderColor, HeaderLogo,schoolLogo,BGColor,BGLogo,ThemeBGColor,ThemeTextColor,SplashScreen } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const SchoolInfo_AdditionInfo1 = new SchoolInfo_AdditionInfo({
                HeaderColor:HeaderColor, HeaderLogo:HeaderLogo,schoolLogo:schoolLogo,BGColor:BGColor,BGLogo:BGLogo,ThemeBGColor:ThemeBGColor,ThemeTextColor:ThemeTextColor,SplashScreen :SplashScreen,school: req.user.id
            })
            const savedSchoolInfo_AdditionInfo = await SchoolInfo_AdditionInfo1.save()

            res.json(savedSchoolInfo_AdditionInfo)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateSchoolInfo_AdditionInfo/:id', fetchuser, async (req, res) => {
    const {HeaderColor, HeaderLogo,schoolLogo,BGColor,BGLogo,ThemeBGColor,ThemeTextColor,SplashScreen } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (HeaderColor) { newNote.HeaderColor = HeaderColor };
      
        if (HeaderLogo) { newNote.HeaderLogo = HeaderLogo };
        if (schoolLogo) { newNote.schoolLogo = schoolLogo };
        if (BGColor) { newNote.BGColor = BGColor };
        if (BGLogo) { newNote.BGLogo = BGLogo };
        if (ThemeBGColor) { newNote.ThemeBGColor = ThemeBGColor };
        if (ThemeTextColor) { newNote.ThemeTextColor = ThemeTextColor };
        if (SplashScreen) { newNote.SplashScreen = SplashScreen };
        // Find the note to be updated and update it
        let note = await SchoolInfo_AdditionInfo.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await SchoolInfo_AdditionInfo.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteSchoolInfo_AdditionInfo/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await SchoolInfo_AdditionInfo.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await SchoolInfo_AdditionInfo.findByIdAndDelete(req.params.id)
        res.json({ "Success": "SchoolInfo_AdditionInfo has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
