const nodemailer = require('nodemailer')
const {EMAIL_ADDRESS, EMAIL_PASSWORD} = require('../../config') 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD
    }
})

module.exports = {
    transporter
}