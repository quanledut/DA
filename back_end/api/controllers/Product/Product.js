const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const {getSubImage} = require('../../helpers/uploadImage')


const requestNewProduct = (req, res) => {
    try {
        console.log('New Product')
        console.log(req.body);
        console.log(req.files);
        const { name, description, length, width, height, unitprice, saleprice, importqty, department } = req.body;
        const files = req.files;
        Product.find().sort({ no: -1 }).limit(1).then(products => {
            newProduct = new Product();
            newProduct.name = name;
            newProduct.description = description;
            newProduct.length = length;
            newProduct.width = width;
            newProduct.height = height
            newProduct.unitprice = unitprice
            newProduct.saleprice = saleprice;
            newProduct.importqty = importqty;
            newProduct.images = files.filter(file => file.filename != files[0].filename).map(file => { return file.filename });
            newProduct.subImage = files[0] != null ? files[0].filename : '';
            newProduct.department = department;
            newProduct.no = products[0] != null ? products[0].no + 1 : 0;
            newProduct.save();
            res.status(201).send(newProduct);
            console.log(products)
            return;
        })
            .catch(err => {
                res.status(400).send('Can not connect ');
            })
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}

const getProduct = async (req, res) => {
    try {
        const { page, limit, department, condition } = req.headers
        if (!page && !limit && !department && !condition) {
            const productCount = await Product.count({});
            const products1 = await Product.find({});
            const products = await Promise.all(products1.map(async product => {product.subImage = await getSubImage(product.subImage); return product;})); 
            await res.status(200).send({productCount, products});
        }
    }
    catch(err){
        res.status(404).send(err)
    }
}

module.exports = {
    requestNewProduct,
    getProduct
}