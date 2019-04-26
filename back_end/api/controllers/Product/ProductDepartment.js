const mongoose = require('mongoose');
const ProductDepartment = mongoose.model('ProductDepartment');

const findProductDepartment = async (req, res) => { 
    try{
        let productDepartments = await ProductDepartment.find({});
        res.status(200).send(productDepartments);
    }
    catch(err){
        res.status(400).send(err);
    }
}

const newDepartment = (req, res) => {
    if(!req.is('application/json')){
        res.status(400).send('Invalid datatype');
        return;
    }
    let departments  = req.body;
    //console.log(de)
    let name = departments.map(department => department.name);
    ProductDepartment.find({name: {$all:name}},(err, matchDepartment) => {

    })
    ProductDepartment.insertMany(departments,(err, inserted) => {
        if(err){
            res.status(404).send(err);
            return;
        }
        else{
            res.status(200).send(inserted);
            return;
        }
    })
}


module.exports = {
    findProductDepartment,
    newDepartment
}