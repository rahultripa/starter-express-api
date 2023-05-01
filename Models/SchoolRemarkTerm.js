const mongoose = require('mongoose');
const SchoolRemarkTermSchema = new mongoose.Schema(
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
        MaxmumMarks:{

            type: Number,
            require = true
        },
        CurrentMarks:{

            type: Number,
            require = true
        },

        term:{

            type: string,
            require = true
        },
        HDate:{

            type: Date,
            default: Date.now
        },
        
        Remark:{

            type: String,
            require: true
        }


    }
)


    const SchoolRemarkTerm= mongoose.model('SchoolRemarkTerm_list',SchoolRemarkTermSchema);

module.exports= SchoolRemarkTerm;

