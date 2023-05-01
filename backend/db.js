const mongoose = require('mongoose');
const mongooseURI="mongodb+srv://myoxydb:8nrsBUaTpSgoa8BT@atlascluster.bfecik7.mongodb.net/test";
//.connect('mongodb://127.0.0.1:27017/test');

const username = "myoxydb";
const password = "Abcd%@111";
const cluster = "atlascluster.bfecik7";
const dbname = "myFirstDatabase";

require('dotenv').config()
const connectToMongoDB=()=>{
    try {

        //mongoose.set('strictQuery', false)

        // mongoose.connect(
        //     `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
        //     {useNewUrlParser: true, 

        //         useUnifiedTopology: true 
        //     });
        mongoose.connect(mongooseURI) 
        console.log('Mongo by ')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}


module.exports =connectToMongoDB;