const mongoose = require('mongoose');
const AnnouncementSchema = new  mongoose.Schema(
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
Announcement:{

    type: String,
    require: true
},
AnnouncementDescription:{

    type: String,
    require: true
},
AnnouncementDate:{

    type: Date,
    default: Date.now
}
}
    

)


const Announcement= mongoose.model('AnnouncementList',AnnouncementSchema);

module.exports= Announcement;
 