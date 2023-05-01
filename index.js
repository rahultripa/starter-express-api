const connectToMongoDB= require('./db');
const express = require('express')
var cors = require('cors') ;

const app = express()
const port = 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/OxySchool_info',require('./routes/OxySchool_info'));
 //app.use('/api/SchoolImageGallaryCategoryList',require('./routes/SchoolImageGallaryCategoryList'));
 //app.get('/', (req, res) => {
 //res.send('Hello Rahul!')
 //})

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
