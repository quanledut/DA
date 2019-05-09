const {requestNewProduct, getProduct} = require('../controllers/Product/Product');
const {checkRoleAdmin} = require('../helpers/checkRole');
const {gfs,upload} = require('../helpers/uploadImage');
const {showReqInfo} = require('../helpers/showInfo')

module.exports = (router) => {
    router.post('/products/new',showReqInfo,checkRoleAdmin, upload.array('files',5),requestNewProduct),
    router.get('/products',showReqInfo,getProduct)
}