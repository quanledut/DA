const {showReqInfo} = require('../helpers/showInfo');
const {importStock} = require('../controllers/Stock');
const {checkRoleAdmin, checkRoleManager} = require('../helpers/checkRole')

module.exports = (router) => {
    router.post('/import', showReqInfo,checkRoleManager,importStock)
}