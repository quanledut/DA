const mongoose = require('mongoose');

const CurrencySchema = mongoose.Schema({
        name: {
            type: String,
            trim: true,
        },
        caption: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)


mongoose.model('Currency', CurrencySchema);