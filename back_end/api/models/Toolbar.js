const mongoose = require('mongoose');

let toolbarSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    caption: {
        type: String,
        required: true,
        trim: true
    },
    keyword: {
        type: String,
        required: true,
        trim: true
    },
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Toolbar'}
})

mongoose.model('Toolbar', toolbarSchema);