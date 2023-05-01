const mongoose = require('mongoose');
const Student_Fee_InfoSchema = new mongoose.Schema(
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
        StudentInfo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudentInfo_list'
        },
        DepositDate:{

            type: Date,
            default: Date.now
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
        DepositAmount:{

            type: Number
        },
        Type:{

            type: String
        },
        TxnType:{

            type: String
        },
        TxnReference:{

            type: String
        }


    }
)


    const Student_Fee_Info= mongoose.model('Student_Fee_Info_list',Student_Fee_InfoSchema);

module.exports= Student_Fee_Info;

