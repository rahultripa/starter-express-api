const mongoose = require('mongoose');
const SectionInfoSchema = new mongoose.Schema(
    {
        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },
Section:{

    type: String,
     require: true
},
SectionDescription:{

    type: String
},
Class:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassInfo_list'
        }




    }
)


    const SectionInfo= mongoose.model('SectionInfo_list',SectionInfoSchema);

module.exports= SectionInfo;

