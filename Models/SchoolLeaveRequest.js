const mongoose = require('mongoose');
const SchoolLeaveRequestSchema = new mongoose.Schema(
    {
        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },

Class:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassInfo_list'
        },

        Section:{

            type: mongoose.Schema.Types.ObjectId,
            ref: 'SectionInfo_list'
        },
        StudentInfo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudentInfo_list'
        },
        Subject:{

            type: String,
            require: true
        },
        Comment:{
        
            type: String,
            require: true
        },
        Status:{
        
            type: String,
            require: true
        }
        
            


    }
)


    const SchoolLeaveRequest= mongoose.model('SchoolLeaveRequest',SchoolLeaveRequestSchema);

module.exports= SchoolLeaveRequest;

