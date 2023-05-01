const mongoose = require('mongoose');
const HomeWorkSchema = new mongoose.Schema(
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
    Subject:{

    type: String,
    require: true
},
Homework:{

    type: String,
    require: true
},
Date:{

    type: Date,
    default: Date.now
}


}
    

)
const homework= mongoose.model('HomeWorkList',HomeWorkSchema);

module.exports= homework;