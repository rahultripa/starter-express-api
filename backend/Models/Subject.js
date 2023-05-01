const mongoose = require('mongoose');
const SubjectSchema = new mongoose.Schema(
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


Subject:{

    type: String,
    require: true
},
SubjectDescription:{

    type: String,
    require: true
}

    }
)


    const Subject= mongoose.model('Subject_list',SubjectSchema);

module.exports= Subject;

