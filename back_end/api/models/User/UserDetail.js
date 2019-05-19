const mongoose = require('mongoose');
var Schema  = mongoose.Schema;

const userDetailSchema = Schema({
    user_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    birthday: {
        type: Date,
        trim: true
    }
})

mongoose.model('UserDetail', userDetailSchema);
