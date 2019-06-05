const {requestNewSaleOrder, find, getSaleOrderById, nextStatusSaleOrder, updateSaleOrder} = require('../controllers/SaleOrder');
const {checkRoleAdmin, checkLogin, checkRoleManager} = require('../helpers/checkRole');
const {gfs,upload} = require('../helpers/uploadImage');
const {showReqInfo} = require('../helpers/showInfo');
const {checkInventoryStock} = require('../helpers/checkInventoryStock')

module.exports = (router) => {
    router.post('/saleorder/new', showReqInfo, checkLogin, requestNewSaleOrder),
    router.get('/saleorders/detail/:id?', showReqInfo, getSaleOrderById),
    router.get('/saleorder/', showReqInfo, checkLogin, find),
    router.put('/saleorders/nextstatus/:id?', showReqInfo, checkRoleManager, checkInventoryStock, nextStatusSaleOrder),
    router.put('/saleorders/:id?', showReqInfo, checkRoleManager, updateSaleOrder)
}