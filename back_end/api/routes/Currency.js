const {find,requestNewCurrency} = require('../controllers/Currency');
const {checkRoleAdmin, checkLogin} = require('../helpers/checkRole');
const {showReqInfo} = require('../helpers/showInfo')

module.exports = (router) => {
    router.post('/currency/new',showReqInfo,checkRoleAdmin, requestNewCurrency),
    router.get('/currencies',showReqInfo,find)
}