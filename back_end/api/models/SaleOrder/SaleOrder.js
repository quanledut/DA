const mongoose = require('mongoose');

const SaleOrderSchema = mongoose.Schema({
        no: {
            type: String,
        },
        customer_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        sub_total_amount: {
            type: Number,
        },
        discount: {
            type: Number,
        },
        total_amount: {
            type: Number,
        },
        paid_amount: {
            type: Number,
        },
        payment_type: {
            type: String,
        },
        bank_name: {
            type: String,
        },
        bank_number: {
            type: String,
        },
        shipment_type: {
            type: String,
        },
        shipment_date: {
            type: Date,
        },
        receiver_name: {
            type: String,
        },
        shipment_address:{
            type: String
        },
        receiver_phone_number: {
            type: String
        },
        status: {
            type: String
        },
        seller_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        items: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            sale_price: Number,
            qty: Number
        }]
    },
    {
        timestamps: true
    }
)


mongoose.model('SaleOrder', SaleOrderSchema);