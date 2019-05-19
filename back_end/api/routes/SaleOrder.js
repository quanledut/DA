const {requestNewSaleOrder, find, getSaleOrderById, nextStatusSaleOrder} = require('../controllers/SaleOrder');
const {checkRoleAdmin, checkLogin, checkRoleManager} = require('../helpers/checkRole');
const {gfs,upload} = require('../helpers/uploadImage');
const {showReqInfo} = require('../helpers/showInfo')

module.exports = (router) => {
    router.post('/saleorder/new', showReqInfo, checkLogin, requestNewSaleOrder),
    router.get('/saleorders/detail/:id?', showReqInfo, checkLogin, getSaleOrderById),
    router.get('/saleorder/', showReqInfo, checkLogin, find),
    router.put('/saleorders/nextstatus/:id?', showReqInfo, checkRoleAdmin, nextStatusSaleOrder)
}