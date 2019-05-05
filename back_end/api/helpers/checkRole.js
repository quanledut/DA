const {secretKey} = require('../../config')
const crypto = require('crypto');
const atob = require('atob');

const checkRoleAdmin = (req, res, next) => {
    let bearerToken = req.headers['authorization'];
    if(!bearerToken) {
        res.status(404).send('Token not match');
        return;
    }
    let token = bearerToken.trim().split(' ')[1]
    let tokenData = atob(token);
    let userData = tokenData.trim().split('}')[1];
    if(!userData) 
    {
        res.status(401).send('User info not found in token');
        return;
    }
    userData = JSON.parse(userData + '}');
    if(userData.role != 'admin') 
    {
        res.status(403).send('Permission denied');
        return;
    }
    return next();
}

module.exports = {
    checkRoleAdmin
}