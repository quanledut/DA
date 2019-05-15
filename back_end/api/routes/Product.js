const {requestNewProduct, getProduct, getProductDetail,changeProductDetail,deleteProduct, getProductMainInfo} = require('../controllers/Product/Product');
const {checkRoleAdmin} = require('../helpers/checkRole');
const {gfs,upload} = require('../helpers/uploadImage');
const {showReqInfo} = require('../helpers/showInfo')

module.exports = (router) => {
    router.post('/products/new',showReqInfo,checkRoleAdmin, upload.array('files',5),requestNewProduct),
    router.get('/products',showReqInfo,getProduct),
    router.get('/products/:id', showReqInfo, getProductDetail),
    router.get('/products/mainInfo/:id', showReqInfo, getProductMainInfo )
    router.put('/products/:id', showReqInfo, checkRoleAdmin, changeProductDetail),
    router.delete('/products/:id', showReqInfo, checkRoleAdmin, deleteProduct)

}