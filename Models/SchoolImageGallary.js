const mongoose = require('mongoose');
const SchoolImageGallarySchema = new mongoose.Schema(
    {
        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },
        GalleryCaption:{

            type: String
        },
        PhotoDescription:{

            type: String
        },

        PhotoData:{

            type: String
        },

        PhotoPath:{

            type: String
        },

        SchoolImageGallaryCategory:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SchoolImageGallaryCategory_list'
        }



    }
)


    const SchoolImageGallary= mongoose.model('SchoolImageGallary_list',SchoolImageGallarySchema);

module.exports= SchoolImageGallary;

