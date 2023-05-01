const mongoose = require('mongoose');
const ClassInfoSchema = new mongoose.Schema(
    {
        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },
Class:{

    type: String,
     require: true
},
ClassDescription:{

    type: String,
     require: true
}


    }
)

 const ClassInfo= mongoose.model('ClassInfo_list',ClassInfoSchema);

module.exports= ClassInfo;

