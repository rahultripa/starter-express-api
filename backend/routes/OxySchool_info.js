const express = require('express');
const router = express.Router();
const OxySchool_info= require('../Models/OxySchool_info');
const bcrypt = require('bcryptjs');
const { body,validationResult } = require('express-validator');
const JWT_SECRET = 'Harryisagoodb$oy';
var jwt = require('jsonwebtoken');
const fetchuser= require('../middleware/fetchuser');
router.post('/createschool',
[body('SchoolName','Enter SchoolName ').notEmpty(),

body('Password','Enter Password ').notEmpty(),
body('MobileNo','Enter MobileNo ').notEmpty(),
body('City','Enter City ').notEmpty(),
body('State','Enter State ').notEmpty(),
body('Email','Enter valid Email ').isEmail()
],


async(req,res)=>
{
    try{
      let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   const salt=await bcrypt.genSalt(10);
    secpass= await bcrypt.hash( req.body.Password, salt);
    let user= await OxySchool_info.findOne({Email:req.body.Email});
    console.log(user);
    if(user)
    {

        return res.status(400).json('Email alrady exist');
    }
    user= await OxySchool_info.create({
        SchoolName: req.body.SchoolName,
        Description: req.body.Description,
        AboutUs: req.body.AboutUs,
        SortNAme: req.body.SortNAme,
        UserName: req.body.UserName,
        Password:secpass,

        Email: req.body.Email,
        MobileNo: req.body.MobileNo,
        Address: req.body.Address,
        City: req.body.City,
        State: req.body.State,
        ServerAPIKey: req.body.ServerAPIKey,
        SENDER_ID: req.body.SENDER_ID,
        Android_Key: req.body.Android_Key,
        iOS_Key: req.body.iOS_Key,
        Comment: req.body.Comment,

      });
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
       
      success=true;
      // res.json(user)
      res.json({ success,authtoken })
    }catch(error)
    {
        console.error(error.massege);
        return   res.status(500).json(success,'Some Error Pls try again');
    }
   
})

router.post('/login', [
    body('Email', 'Enter a valid email').isEmail(),
    body('Password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { Email, Password } = req.body;
    try {
      let user = await OxySchool_info.findOne({ Email });
      if (!user) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
  
      const passwordCompare = await bcrypt.compare(Password, user.Password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
  
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    } 
  });

  router.post('/getSchool', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      console.log(userId);
      const user = await OxySchool_info.findById(userId).select("-Password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
  module.exports = router;