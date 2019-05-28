const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const SaleOrder = mongoose.model('SaleOrder');
const { getSubImage } = require('../../helpers/uploadImage');
const { removeSignString } = require('../../helpers/removeSignText')

Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
  }

const requestNewProduct = async (req, res) => {
    try {
        console.log('New Product')
        console.log(req.body);
        console.log(req.files);
        const { name, description, length, width, height, unitprice, saleprice, importqty, department } = req.body;
        const files = req.files;
        let newestProduct = await Product.findOne().sort({createdAt: -1});
        if(!newestProduct){
            no = 'ĐBH-0001'
        }
        else {
            let newIndexNo = '000' + (parseInt(newestProduct.no.split('-')[1]) + 1);
            no = 'SP-' + newIndexNo.substring(newIndexNo.length - 4, newIndexNo.length)
        }
        Product.find().sort({ no: -1 }).limit(1).then(products => {
            newProduct = new Product();
            newProduct.name = name;
            newProduct.description = description;
            newProduct.length = length;
            newProduct.width = width;
            newProduct.height = height
            newProduct.unitprice = unitprice
            newProduct.saleprice = [{ time: new Date(), value: saleprice }];
            newProduct.importqty = importqty;
            newProduct.images = files.filter(file => file.filename != files[0].filename).map(file => { return file.filename });
            newProduct.subImage = files[0] != null ? files[0].filename : '';
            newProduct.department = department;
            newProduct.no = no;
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
        const { name, page, limit, department, sort_by } = req.query;
        console.log(JSON.stringify(req.query))
        let products = await Product.find({});
        let productFilter = name ? products.filter(product => removeSignString(product.name).indexOf(removeSignString(name)) >= 0) : products;
        let productFilterSort = sort_by == 'priceassending' ? productFilter.sort(function(a,b){return b.saleprice[b.saleprice.length -1].value - a.saleprice[a.saleprice.length -1].value})
        : sort_by == 'pricedecending' ? productFilter.sort(function(a,b){return a.saleprice[a.saleprice.length -1].value - b.saleprice[b.saleprice.length -1].value}) : productFilter.sort(function(a,b){return a.createdAt < b.createdAt ? 1 : -1})
        let result = await productFilterSort.slice((page - 1) * limit, (page - 1) * limit + limit);
        const resultRes = await Promise.all(result.map(async product => { product.subImage = await getSubImage(product.subImage); return product; }));
        console.log('So luong sp trang : ' + result.length)
        await res.status(200).send({ products: resultRes, productCount: productFilter.length });
    }
    catch (err) {
        res.status(404).send(err)
    }
}

const getProductDetail = async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        if (id != null && id != '') {
            let product = await Product.findOne({ _id: id });
            product.subImage = await getSubImage(product.subImage);
            product.images = await Promise.all(product.images.map(async (image) => { return await getSubImage(image)}));
            let saleOrders = await SaleOrder.find({'items.product_id':id}).populate('customer_id');
            saleOrders = await Promise.all(saleOrders.map(async (saleOrder) => { 
                saleOrder.customer_id.avatar = await getSubImage(saleOrder.customer_id.avatar);
                return saleOrder;
            }));
            res.status(200).send({product,saleOrder:[...saleOrders]});
        }
        else {
            res.status(400).send('id required')
        }
    }
    catch (err) {
        res.status(404).send(err);
    }
}

const changeProductDetail = async (req,res) => {
    try{
        const {_id,name,description,width, height,length,saleprice} = req.body;
        let product = await Product.findOne({_id});
        if(product != null){
            product.name = name || product.name;
            product.description = description || product.description;
            product.width = width  || product.width;
            product.height = height   || product.height;
            product.length = length  || product.length;
            product.saleprice = product.saleprice != saleprice ? [...product.saleprice, {time:new Date(),value:saleprice}] : product.saleprice;
            await product.save();
            res.status(200).send('Updated')
        }
        else {
            res.status(404).send('_id not found')
        }
    }
   catch(err){
       res.status(403).send(err)
   }
}

const deleteProduct = (req, res) => {
    // try{
    //     const {_id} = req.params;
    //     Product.findOneAndRemove({_id},);
    // }
}

const getProductMainInfo = async (req,res) => {
    try {
        const { id } = req.params;
        if (id != null && id != '') {
            let product = await Product.findOne({ _id: id });
            product.subImage = await getSubImage(product.subImage);
            res.status(200).send(product);
        }
        else {
            res.status(400).send('id required')
        }
    }
    catch (err) {
        res.status(404).send(err);
    }
}

module.exports = {
    requestNewProduct,
    getProduct,
    getProductDetail,
    changeProductDetail,
    deleteProduct,
    getProductMainInfo
}