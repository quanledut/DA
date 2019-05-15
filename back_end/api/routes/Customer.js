const {find,requestNewCustomer} = require('../controllers/Customer');
const {checkRoleAdmin, checkLogin} = require('../helpers/checkRole');
const {gfs,upload} = require('../helpers/uploadImage');
const {showReqInfo} = require('../helpers/showInfo')

module.exports = (router) => {
    router.post('/customers/new',showReqInfo,checkLogin, upload.single('file'),requestNewCustomer),
    router.get('/customers',showReqInfo,checkLogin,find)
}