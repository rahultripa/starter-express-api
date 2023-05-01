const mongoose = require('mongoose');
const SchoolgcmSchema = new mongoose.Schema(
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
        gcm_regid:{
        
            type: String,
            require: true
        },
        iOSID:{
        
            type: String,
            require: true
        },
        Comment:{
        
            type: String,
            require: true
        }

    }
)


    const Schoolgcm= mongoose.model('School)gcm_list',SchoolgcmSchema);

module.exports= Schoolgcm;

