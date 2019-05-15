const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
const {getSubImage} = require('../helpers/uploadImage')

const find = async (req, res) => {
    try {
        console.log('Customer get')
        let customers = await Customer.find();
        let customerWithAvatar = await Promise.all(customers.map(async (customer) => {customer.avatar = await getSubImage(customer.avatar); return customer;}))
        res.status(200).send(customerWithAvatar);
    }
    catch (err) {
        res.status(400).send(customers);
    }
}

const requestNewCustomer = (req, res) => {
        const {name, gender, email, phone_number, birthday, address} = req.body;
        const {filename} = req.file;
        let customer = new Customer();
        customer.name = name;
        customer.gender = gender;
        customer.email = email;
        customer.phone_number = phone_number;
        customer.birthday = birthday;
        customer.address = address;
        customer.avatar = filename;
        customer.save().then(result => {res.status(201).send(result)})
        .catch(err => {res.status(500).send(err)});
}

module.exports = {
    find,
    requestNewCustomer
}