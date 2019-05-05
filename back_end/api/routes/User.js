const UserController = require('../controllers/User')
const {auth} = require('../helpers/auth')
const {checkRoleAdmin} = require('../helpers/checkRole')
const {upload} = require('../helpers/uploadImage')
module.exports = (router) => {
    router.get('/users',auth,UserController.find);
    router.post('/register',checkRoleAdmin, upload.single('file'), UserController.register);
    router.post('/login', UserController.login);
    router.post('/checkToken', UserController.checkToken);
    router.post('/reset',UserController.forgotPassword);
    router.get('/reset', UserController.checkResetToken);
    router.post('/updatepass', UserController.setNewPassword)
}