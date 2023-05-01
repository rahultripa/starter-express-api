const mongoose = require('mongoose');
const School_feeStructureSchema = new mongoose.Schema(
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

            type: Number
        },
        Discount:{

            type: Number
        },
        LateFee:{
            type: Number
        },
        Type:{

            type: String
        }

    }
)


    const School_feeStructure= mongoose.model('School_feeStructure_list',School_feeStructureSchema);

module.exports= School_feeStructure;

