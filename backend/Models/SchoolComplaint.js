const mongoose = require('mongoose');
const SchoolComplaintSchema = new mongoose.Schema(
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


        Date:{

            type: Date,
            default: Date.now
        },
Subject:{

    type: String,
    require: true
},
Comment:{

    type: String,
    require: true
}

    }
)


    const SchoolComplaint= mongoose.model('SchoolComplaint_list',SchoolComplaintSchema);

module.exports= SchoolComplaint;

