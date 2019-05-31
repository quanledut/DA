const router = require('express')
const {getTopDiscountProduct, getTopSaleProduct} = require('../controllers/Sale')

module.exports = (router) => {
    router.get('/top_discount_product', getTopDiscountProduct),
    router.get('/top_sale_product', getTopSaleProduct)
}