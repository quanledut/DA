const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../../config');

const UserSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        salt: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

UserSchema.methods.generateHash = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64,config.algorithm).toString('hex');
}

UserSchema.methods.validPassword = function(password){
    let passHash = crypto.pbkdf2Sync(password,this.salt,1000,64,config.algorithm).toString('hex');
    return passHash = this.hash;
}

mongoose.model('User', UserSchema);