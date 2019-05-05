const mongoose = require('mongoose');
const {gfs} = require('../../helpers/uploadImage');

const ProductSchema = mongoose.Schema({
        name:  {
            type: String,
            required: true,
        },
        no:{
            type: Number,
            required: true 
        },
        description: {
            type: String
        },
        length:  {
            type: Number,
        },
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        unitprice: {
            type: Number,
        },
        saleprice: {
            type: Array,
        },
        importqty: {
            type: Number,
        },
        subImage: {
            type: String,
        },
        images: {
            type: Array,
        },
        department: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

ProductSchema.methods.getSubImage = function(){
    gfs.files.findOne({filename: this.subImage}).then(image=>{
        if(image){
            var readstream = gfs.createReadStream({filename: image.filename});
            readstream.on('data',(chunk) => 
                {
                    this.subImage = chunk.toString('base64');
                })
        }
    })
    return this.subImage;
}

mongoose.model('Product', ProductSchema);