const mongoose = require('mongoose');

const ProductDepartmentSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            dropDups: true
        },
        caption: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)


mongoose.model('ProductDepartment', ProductDepartmentSchema);