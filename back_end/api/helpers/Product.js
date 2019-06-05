const mongoose = require('mongoose');
const Product = mongoose.model('Product')

const checkInventoryQty = (saleOrderItem) => {
    return new Promise((resolve, reject) => {
        Product.findOne({_id: saleOrderItem.product_id}).then(product => {
            if(product == null) reject('Not found product')
            else{
                if(product.importqty < saleOrderItem.qty) reject('Stock not enought qty');
                else resolve('Checked')
            }
        })
        .catch(err => reject(err))
    })
}

const divideInventoryStock = (saleOrderItem) => {
    return new Promise(async (resolve, reject) => {
        try{
            let product = await Product.findOne({_id: saleOrderItem.product_id});
            if(!product) reject('Not found product');
            else{
                product.importqty = product.importqty - saleOrderItem.qty;
                let savedProduct = await product.save();
                resolve(savedProduct);
            }
        }
        catch(err){
            reject('Can not divide inventory')
        }
    })
}


const addInventoryStock = (importProductItem) => {
    return new Promise(async (resolve, reject) => {
        try{
            let product = await Product.findOne({_id: importProductItem._id});
            if(!product) reject('Not found product');
            else{
                product.importqty = product.importqty + importProductItem.qty;
                let savedProduct = await product.save();
                resolve(savedProduct);
            }
        }
        catch(err){
            reject('Can not add inventory')
        }
    })
}

module.exports = {
    checkInventoryQty,
    divideInventoryStock,
    addInventoryStock
}