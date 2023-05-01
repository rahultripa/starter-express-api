const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema(
    {

        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },
Section:{

    type: mongoose.Schema.Types.ObjectId,
    ref: 'SectionInfo_list'
},

Class:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassInfo_list'
        },
        ReasonofAbsent:{
        
            type: String
        },

        StudentInfo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudentInfo_list'
        },
        ReasonofAbsent:{
        
            type: String
        },
IsPressent:
{
     type: Boolean,
     default : true,
     require: true
},
Term:{

    type: String,
    require: true
},
AttendanceDate:{

    type: Date,
    default: Date.now
}


}
    

)

const Attendance= mongoose.model('AttendanceList',AttendanceSchema);

module.exports= Attendance;