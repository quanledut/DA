const UserController = require('../controllers/User')
const {auth} = require('../helpers/auth')
module.exports = (router) => {
    router.get('/users',auth,UserController.find);
    router.post('/register', UserController.register);
    router.post('/login', UserController.login);
    router.post('/checkToken', UserController.checkToken);
}