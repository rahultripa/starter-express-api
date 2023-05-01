const mongoose = require('mongoose');
const HolidaySchema = new mongoose.Schema(
    {
        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },


Announcement:{

    type: String,
    require: true
},
HolidayDescription:{

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
const HolidayList= mongoose.model('HolidayList',HolidaySchema);

module.exports= HolidayList;