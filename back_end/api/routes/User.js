const UserController = require('../controllers/User');
const {auth} = require('../helpers/auth');
const {checkRoleAdmin, checkLogin} = require('../helpers/checkRole');
const {upload} = require('../helpers/uploadImage');
const {showReqInfo} = require('../helpers/showInfo.js');
const {} = require('../helpers/checkRole');

module.exports = (router) => {
    router.get('/users',showReqInfo,auth,UserController.find);
    // router.post('/register',checkRoleAdmin, upload.single('file'),showReqInfo, UserController.register);
    router.post('/register', upload.single('file'),showReqInfo, UserController.register);
    router.post('/login',showReqInfo, UserController.login);
    router.post('/checkToken',showReqInfo, UserController.checkToken);
    router.post('/reset',showReqInfo,UserController.forgotPassword);
    router.get('/reset',showReqInfo, UserController.checkResetToken);
    router.post('/updatepass',showReqInfo, UserController.setNewPassword);
    router.post('/users/detail',showReqInfo,checkLogin, UserController.updateUserDetail);
    router.post('/users/avatar',showReqInfo, upload.single('file'),checkLogin, UserController.updateUserAvatar)
}