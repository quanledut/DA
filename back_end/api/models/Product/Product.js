const mongoose = require('mongoose');

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


mongoose.model('Product', ProductSchema);