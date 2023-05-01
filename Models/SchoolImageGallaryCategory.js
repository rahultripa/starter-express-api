const mongoose = require('mongoose');
const SchoolImageGallaryCategorySchema = new mongoose.Schema(
    {
        school:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OxySchool_infoList'
        },
        GalleryName:{

            type: String,
            require: true
        },
        GalleryDescription:{

            type: String
        }



    }
)


    const SchoolImageGallaryCategory= mongoose.model('SchoolImageGallaryCategory_list',SchoolImageGallaryCategorySchema);

module.exports= SchoolImageGallaryCategory;

