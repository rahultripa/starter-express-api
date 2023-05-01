const mongoose = require('mongoose');
const SchoolFacilitiesSchema = new mongoose.Schema(
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
        Name:{

            type: String,
            require: true
        },
        Degree:{

            type: String
        },
        Possition:{

            type: String
        },
        Comment:{
        
            type: String
        },
        Email:{
        
            type: String
        },
        Mobile:{
        
            type: String
        }
        
            
        


    }
)


    const SchoolFacilities= mongoose.model('SchoolFacilities',SchoolFacilitiesSchema);

module.exports= SchoolFacilities;

