const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Student_Fee_Info = require('../Models/Student_Fee_Info');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallStudent_Fee_Info', fetchuser, async (req, res) => {
    try {

        console.log(req.user.id);

        const Student_Fee_Info1 = await Student_Fee_Info.find({school: req.user.id});
        res.json(Student_Fee_Info1)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/AddStudent_Fee_Info', fetchuser, [
    body('Type', 'Enter a valid Type').isLength({ min: 1 }),
    body('Class', 'Enter a valid OxySudentRemark Description').isLength({ min: 3 }),
             body('Section', 'Enter a valid Section Description').isLength({ min: 3 }),
                    body('Discount', 'Enter a valid Discount Description').isNumeric(),
                    body('Fee', 'Enter a valid Fee Description').isNumeric(),
                        body('LateFee', 'Enter a valid LateFee Description').isNumeric()
                    ], async (req, res) => {
        try {
            const {Class, Section,Fee,Discount,LateFee,Type,Student,DepositAmount,TxnType,TxnReference } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.user.id);
            const Student_Fee_Info1 = new Student_Fee_Info({
                Class:Class, Section:Section,Fee:Fee,Discount:Discount,LateFee:LateFee,Type:Type,DepositAmount:DepositAmount,TxnType:TxnType,TxnReference:TxnReference ,Student:Student, school: req.user.id
            })
            const savedStudent_Fee_Info = await Student_Fee_Info1.save()

            res.json(savedStudent_Fee_Info)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateStudent_Fee_Info/:id', fetchuser, async (req, res) => {
    const {Class, Section,Fee,Discount,LateFee,Type,Student,DepositAmount,TxnType,TxnReference } = req.body;
  try {
        // Create a newNote object
        const newNote = {};
        if (Type) { newNote.Type = Type };
        if (Class) { newNote.Class = Class };
        if (Section) { newNote.Section = Section };
        if (Fee) { newNote.Fee = Fee };
        if (Discount) { newNote.Discount = Discount };
        if (LateFee) { newNote.LateFee = LateFee };
        if (Student) { newNote.Student = Student };
        if (TxnType) { newNote.TxnType = TxnType };
       
        if (DepositAmount) { newNote.DepositAmount = DepositAmount };
       
        if (TxnReference) { newNote.TxnReference = TxnReference };
       
        // Find the note to be updated and update it
        let note = await Student_Fee_Info.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Student_Fee_Info.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteStudent_Fee_Info/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Student_Fee_Info.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.school.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Student_Fee_Info.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Student_Fee_Info has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
    module.exports = router;
