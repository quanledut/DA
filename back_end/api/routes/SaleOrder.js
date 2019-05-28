const {requestNewSaleOrder, find, getSaleOrderById, nextStatusSaleOrder, getSaleOrderForReport} = require('../controllers/SaleOrder');
const {checkRoleAdmin, checkLogin, checkRoleManager} = require('../helpers/checkRole');
const {gfs,upload} = require('../helpers/uploadImage');
const {showReqInfo} = require('../helpers/showInfo')

module.exports = (router) => {
    router.post('/saleorder/new', showReqInfo, checkLogin, requestNewSaleOrder),
    router.get('/saleorders/detail/:id?', showReqInfo, checkLogin, getSaleOrderById),
    router.get('/saleorder/', showReqInfo, checkLogin, find),
    router.put('/saleorders/nextstatus/:id?', showReqInfo, checkRoleManager, nextStatusSaleOrder)
}