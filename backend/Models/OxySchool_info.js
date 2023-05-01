const mongoose = require('mongoose');
const OxySchool_infoSchema = new mongoose.Schema(
    {
    
        SchoolName:{

    type: String,
    require: true
},
Description:{

    type: String
},
AboutUs:{

    type: String
   
},
SortName:{

    type: String
},UserName:{

    type: String
},Password:{

    type: String,
    require: true
},
Email:{

    type: String,
    require: true,
    unique: true,

},

MobileNo:{

    type: String,
    require: true
},

Address:{

    type: String
  
},

City:{

    type: String,
    require: true
},

State:{

    type: String
},

ServerAPIKey:{

    type: String
  
},
SENDER_ID:{

    type: String
  
},
Android_Key:{

    type: String
  
},
iOS_Key:{

    type: String
  
},
Comment:{

    type: String
  
},
Date:{

    type: Date,
    default: Date.now
}


}
    

)
const OxySchool_info= mongoose.model('OxySchool_infoList',OxySchool_infoSchema);

module.exports= OxySchool_info;