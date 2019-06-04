const mongoose = require('mongoose');
var Schema  = mongoose.Schema;

const userDetailSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    phone_number: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    birthday: {
        type: Date,
        trim: true
    }
})

mongoose.model('UserDetail', userDetailSchema);
