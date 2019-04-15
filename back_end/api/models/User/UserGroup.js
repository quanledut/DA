import mongoose from 'mongoose';
var Schema  = mongoose.Schema;

const userGroupSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    toolbar: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Toolbar'}]
})

