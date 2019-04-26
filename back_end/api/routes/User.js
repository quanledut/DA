const UserController = require('../controllers/User')
const {auth} = require('../helpers/auth')
const {checkRoleAdmin} = require('../helpers/checkRole')
module.exports = (router) => {
    router.get('/users',auth,UserController.find);
    router.post('/register',checkRoleAdmin, UserController.register);
    router.post('/login', UserController.login);
    router.post('/checkToken', UserController.checkToken);
}