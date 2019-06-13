const mongoose = require('mongoose')
const Currency = mongoose.model('Currency');

const find = async (req, res) => {
    try {
        let currencies = await Currency.find();
        res.status(200).send(currencies);
    }
    catch (err) {
        res.status(400).send('Can not get currency');
    }
}

const requestNewCurrency = (req, res) => {
        const {name, caption} = req.body;
        let newCurrency = new Currency({name, caption});
        newCurrency.save().then(result => {res.status(201).send(result)})
        .catch(err => {res.status(500).send(err)});
}

module.exports = {
    find,
    requestNewCurrency
}