const mongoose = require('mongoose');

let StockChangeSchema = mongoose.Schema({
    description: {
        type: String
    },
    type: {
        type: String
    },
    supplier_name:{
        type:String
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    saleorder_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'SaleOrder'
    },
    items:[{
        product_id:{
            type: mongoose.Schema.Types.ObjectId,
        },
        qty: {
            type: Number
        },
        price:{
            type: Number
        }
    }]
},{
    timestamps: true
})

mongoose.model('StockChange', StockChangeSchema);