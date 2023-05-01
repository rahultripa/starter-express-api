const mongoose = require('mongoose');
const OxySudentRemarkSchema = new mongoose.Schema(
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

        Student:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudentInfo_list'
        },

Term:{

    type: String,
    require: true
},
Date:{

    type: Date,
    default: Date.now
},
RollNo:{

    type: String,
    require: true
},

SubjectID:{

    type: String,
    require: true
},
MaxmumMarks:{

    type: Number,
    require: true
},
CurrentMarks:{

    type: Number,
    require: true
},

Remark:{

    type: String,
    require: true
}
    }
)

const OxySudentRemarkSchema1= mongoose.model('OxySudentRemarkSchemaList',OxySudentRemarkSchema);

module.exports= OxySudentRemarkSchema1;
    
