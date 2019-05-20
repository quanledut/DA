const {find,requestNewCustomer, getListCustomer, getCustomerDetail} = require('../controllers/Customer');
const {checkRoleAdmin, checkLogin} = require('../helpers/checkRole');
const {gfs,upload} = require('../helpers/uploadImage');
const {showReqInfo} = require('../helpers/showInfo')

module.exports = (router) => {
    router.post('/customers/new',showReqInfo,checkLogin, upload.single('file'),requestNewCustomer),
    router.get('/customers',showReqInfo,checkLogin,find),
    router.get('/customers/list',showReqInfo,checkLogin,getListCustomer),
    router.get('/customers/:id?',showReqInfo,checkLogin,getCustomerDetail)
}