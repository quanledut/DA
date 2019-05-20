const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
const {getSubImage} = require('../helpers/uploadImage');
const {removeSignString} = require('../helpers/removeSignText')

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

const getListCustomer = async (req, res) => {
    try {
        const {page,limit,search_text} = req.query;
        console.log(JSON.stringify(req.query))
        let customers = await Customer.find({});
        if(!customers && customers.length == 0){
            res.status(200).send({customer_count: 0,customers: []
            })
        }
        else{
            let customerFilters = (search_text && search_text != '') ? 
                customers.filter(item => (removeSignString(item.name).indexOf(removeSignString(search_text)) >= 0 || removeSignString(item.email).indexOf(removeSignString(search_text)) >= 0 || removeSignString(item.phone_number).indexOf(removeSignString(search_text)) >= 0)) 
                : customers
            let result = customerFilters.slice((page - 1) * limit, page * limit);
            const resultRes = await Promise.all(result.map(async customer => { customer.avatar = await getSubImage(customer.avatar); return customer; }));
            res.status(200).send({customer_count:customerFilters.length, customer_list: resultRes});
        }   
    }
    catch (err) {
        res.status(400).send('Qua roi');
    }
}

const getCustomerDetail = async (req, res) => {
    try {
        const {id} = req.params;
        let customer = await Customer.findOne({_id:id});
        if(!customer){
            res.status(404).send('Not Found')
        }
        else{
            customer.avatar = await getSubImage(customer.avatar);
            res.status(200).send(customer);
        }   
    }
    catch (err) {
        res.status(400).send('Qua roi');
    }
}

module.exports = {
    find,
    requestNewCustomer,
    getListCustomer,
    getCustomerDetail
}