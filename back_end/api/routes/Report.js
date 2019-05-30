const {showReqInfo} = require('../helpers/showInfo');
const {getTopSaleEmployee, getSaleReport, getTopSaleProduct, test} = require('../controllers/Report');
const {checkRoleAdmin} = require('../helpers/checkRole')

module.exports = (router) => {
    router.get('/report/top_sale_employee',showReqInfo,checkRoleAdmin,getTopSaleEmployee),
    router.get('/report/sale_report',showReqInfo,checkRoleAdmin,getSaleReport),
    router.get('/report/top_sale_product',showReqInfo,getTopSaleProduct),
    router.get('/report/:product_id',showReqInfo,test)
}