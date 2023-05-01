const connectToMongoDB= require('./db');
const express = require('express')
var cors = require('cors') ;

const app = express()
const port = 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
//app.use('/api/HolidayList',require('./routes/HolidayList'));
app.use('/api/ClassInfoList',require('./routes/ClassInfoList'));
app.use('/api/AnnouncementList',require('./routes/AnnouncementList'));
app.use('/api/AttendanceList',require('./routes/AttendanceList'));
app.use('/api/ExamScheduleList',require('./routes/ExamScheduleList'));
//app.use('/api/HomeWorkList',require('./routes/HomeWorkList'));
//app.use('/api/OxySchool_infoList',require('./routes/OxySchool_infoList'));
 app.use('/api/School_feeStructureList',require('./routes/School_feeStructureList'));
 app.use('/api/OxySudentRemarkList',require('./routes/OxySudentRemarkList'));

 app.use('/api/SchoolComplaintList',require('./routes/SchoolComplaintList'));
 app.use('/api/OxySchool_info',require('./routes/OxySchool_info'));
 app.use('/api/SectionInfolist',require('./routes/SectionInfolist'));
 app.use('/api/Subjectlist',require('./routes/Subjectlist'));
 app.use('/api/SchoolFacilitiesList',require('./routes/SchoolFacilitiesList'));
 app.use('/api/SchoolImageGallaryList',require('./routes/SchoolImageGallaryList'));
 app.use('/api/SchoolImageGallaryCategoryList',require('./routes/SchoolImageGallaryCategoryList'));

 app.use('/api/SchoolInfo_AdditionInfo_list',require('./routes/SchoolInfo_AdditionInfo_list'));
 app.use('/api/SchoolLeaveRequestList',require('./routes/SchoolLeaveRequestList'));
 app.use('/api/Student_Fee_InfoList',require('./routes/Student_Fee_InfoList'));
 app.use('/api/TimeTableList',require('./routes/TimeTableList'));
 //app.use('/api/SchoolImageGallaryCategoryList',require('./routes/SchoolImageGallaryCategoryList'));
// app.get('/', (req, res) => {
//   res.send('Hello Rahul!')
// })

// app.get('/api/login', (req, res) => {
//   res.send('Hello login!')
// })
// app.get('/api/SignUp', (req, res) => {
//   res.send('Hello SignUp!')
// })
// app.get('/', (req, res) => {
//   res.send('Hello Rahul!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
connectToMongoDB();
