const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const SaleOrder = mongoose.model('SaleOrder')
const {getSubImage} = require('../helpers/uploadImage');

const getTopDiscountProduct = async (req, res) => {
    try{
        let products = await Product.find({});
        let productSort = await products.sort((a,b) => {
            return (((a.saleprice[a.saleprice.length -1].value - a.saleprice[0].value)/a.saleprice[0].value) > ((b.saleprice[b.saleprice.length -1].value - b.saleprice[0].value)/b.saleprice[0].value) ? 1 : -1)
        }).slice(0,6);
        let productResult = await Promise.all(productSort.map(async product => {
                product.subImage = await getSubImage(product.subImage);
                return {product};
            }))
        await res.status(200).send(productResult) 
    }
    catch(err){
        res.status(404).send(err)
    }
}

const getTopSaleProduct = async (req, res) => {
    try{
        let products = await SaleOrder.aggregate([
            {
                $match:{
                    createdAt:{$gte:new Date(`${(new Date()).getFullYear()} 01 01`)}
                }
            },
            {
                $unwind:'$items'
            },
            {
                $group:{
                    _id: '$items.product_id',
                    total: {$sum:'$items.qty'}
                }
            },
            {
                $sort:{
                    'total':-1
                }
            },
            {
                $limit:6
            },
            {
                $lookup:{
                    from:'products',
                    localField: '_id',
                    foreignField:'_id',
                    as:'product_id'
                }
            }
        ])
        let productResult = await Promise.all(products.map(async product => {
            product.product_id[0].subImage = await getSubImage(product.product_id[0].subImage);
            return product;
        }))
        await res.status(200).send(productResult) 
    }
    catch(err){
        res.status(404).send(err)
    }
}

module.exports = {
    getTopDiscountProduct,
    getTopSaleProduct
}