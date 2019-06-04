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
    return new Promise((resolve, reject) => {
        Product.findOne({_id: saleOrderItem.product_id}).then(product => {
            try{
                product.importqty = product.importqty - saleOrderItem.qty;
                product.save();
            }
           catch(err){
           }
        })
        .catch(err => {})
    })
}

module.exports = {
    checkInventoryQty,
    divideInventoryStock
}