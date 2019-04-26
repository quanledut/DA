const {findProductDepartment, newDepartment} = require('../controllers/Product/ProductDepartment')
module.exports = (router) => {
    router.post('/department', newDepartment);
    router.get('/department', findProductDepartment);
}