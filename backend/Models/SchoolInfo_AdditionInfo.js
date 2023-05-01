const mongoose = require('mongoose');
const SchoolInfo_AdditionInfoSchema = new mongoose.Schema(
    {
        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },
        HeaderColor:{

            type: String
        },
        HeaderLogo:{

            type: String
        },

        schoolLogo:{

            type: String
        },
        BGColor:{

            type: String
        },
        BGLogo:{

            type: String
        },
        ThemeBGColor:{

            type: String
        },
        ThemeTextColor:{

            type: String
        },
        SplashScreen:{

            type: String
        }




    }
)


    const SchoolInfo_AdditionInfo= mongoose.model('SchoolInfo_AdditionInfo',SchoolInfo_AdditionInfoSchema);

module.exports= SchoolInfo_AdditionInfo;

