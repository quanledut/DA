const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
        name:  {
            type: String,
            required: true,
        },
        gender: {
            type: String
        },
        email:  {
            type: String,
        },
        phone_number: {
            type: String,
        },
        birthday: {
            type: Date,
        },
        address: {
            type: String,
        },
        avatar: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

mongoose.model('Customer', CustomerSchema);