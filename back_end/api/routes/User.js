const UserController = require('../controllers/User')
const {auth} = require('../helpers/auth')
const {checkRoleAdmin} = require('../helpers/checkRole')
const {upload} = require('../helpers/uploadImage')
module.exports = (router) => {
    router.get('/users',auth,UserController.find);
    router.post('/register',checkRoleAdmin, UserController.register);
    router.post('/login', UserController.login);
    router.post('/checkToken', UserController.checkToken);
    router.post('/register/image',upload('single'),UserController.uploadIcon);
}