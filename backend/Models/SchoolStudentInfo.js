const mongoose = require('mongoose');
const StudentInfoSchema = new mongoose.Schema(
    {
        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },
Section:{

    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassInfo_list'
},

Class:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassInfo_list'
        },

        FName:{

            type: String,
            require: true
        },

        FatherName:{

            type: String,
            require: true
        },

        LName:{

            type: String,
            require: true
        },
        Address:{

            type: String
        },
        Photo:{

            type: String
        },
        RollNo:{

            type: String
        },
        Password:{

            type: String
        },
        email:{

            type: String
        },
        Phone:{

            type: String
        },
        gcm_regid:{

            type: String,
            require: true
        },
        DOB:{

            type: Date
        },
        globalStudentID:{

            type: String
        }
        



    }
)


    const StudentInfo= mongoose.model('StudentInfo_list',StudentInfoSchema);

module.exports= StudentInfo;

