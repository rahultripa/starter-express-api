const mongoose = require('mongoose');
const ExamScheduleSchema = new mongoose.Schema(
    {
        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },

Section:{

    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject_list'
},


Subject:{

    type: mongoose.Schema.Types.ObjectId,
    ref: 'SectionInfo_list'
},
Class:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassInfo_list'
        },
Term:{

    type: String,
    require: true
},
AnnouncementDate:{

    type: Date,
    default: Date.now
},
EndDate:{

    type: Date,
    require: true
},
StartDate:{

    type: Date,
    require: true
}


}
    

)

const ExamScheduleList= mongoose.model('ExamScheduleList',ExamScheduleSchema);

module.exports= ExamScheduleList;
//module.exports= mongoose.model('ExamScheduleList'.ExamScheduleSchema);