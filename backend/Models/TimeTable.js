const mongoose = require('mongoose');
const TimeTableSchema = new mongoose.Schema(
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


TimeTable:{

    type: String
},

StartTime:{

    type: String,
    require: true
},
EndTime:{

    type: String,
    require: true
},
Subject:{

    type: String,
    require: true
},
Days:{

    type: String,
    require: true
},
Comment:{

    type: String
}

    }
)


    const TimeTable= mongoose.model('TimeTable_list',TimeTableSchema);

module.exports= TimeTable;

