const mongoose = require('mongoose');
const StudentRemarkTermSchema = new mongoose.Schema(
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
        Fee:{

            type: Number,
            require = true
        },
        Discount:{

            type: Number,
            require = true
        },
        LateFee:{

            type: Number,
            require = true
        },
        Type:{

            type: string,
            require = true
        },

        

    }
)


    const StudentRemarkTerm= mongoose.model('StudentRemarkTerm_list',StudentRemarkTermSchema);

module.exports= StudentRemarkTerm;

