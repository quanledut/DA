const {requestNewProduct, getProduct} = require('../controllers/Product/Product');
const {checkRoleAdmin} = require('../helpers/checkRole');
const {gfs,upload} = require('../helpers/uploadImage')

module.exports = (router) => {
    router.post('/products/new',checkRoleAdmin, upload.array('files',5),requestNewProduct),
    router.get('/products',getProduct)
}