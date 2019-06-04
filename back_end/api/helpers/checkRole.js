const { secretKey } = require('../../config')
const crypto = require('crypto');
const atob = require('atob');
const jwt = require('jsonwebtoken');

const checkRoleAdmin = (req, res, next) => {
    let bearerToken = req.headers['authorization'];
    if (!bearerToken) {
        res.status(404).send('Token not match');
        return;
    }
    let token = bearerToken.trim().split(' ')[1];
    jwt.verify(token, secretKey, (err, auth) => {
        if (err) res.status(403).send('Permission denied');
        else {
            let tokenData = atob(token);
            let userData = tokenData.trim().split('}')[1];
            if (!userData) {
                res.status(401).send('User info not found in token');
                return;
            }
            userData = JSON.parse(userData + '}');
            if (userData.role != 'admin') {
                res.status(403).send('Permission denied 2');
                return;
            }
            req.body.email = userData.email;
            return next();
        }
    })
}

const checkLogin = (req, res, next) => {
    let bearerToken = req.headers['authorization'];
    if (!bearerToken) {
        res.status(404).send('Token not match');
        return;
    }
    let token = bearerToken.trim().split(' ')[1];
    jwt.verify(token, secretKey, (err, auth) => {
        if (err) res.status(403).send('Permission denied');
        else {
            let tokenData = atob(token);
            let userData = tokenData.trim().split('}')[1];
            if (!userData) {
                res.status(401).send('User info not found in token');
                return;
            }
            userData = JSON.parse(userData + '}');
            if (!userData.role) {
                res.status(403).send('Permission denied 2');
                return;
            }
            req.body.email = userData.email;
            return next();
        }
    })
}

const checkRoleManager = (req, res, next) => {
    let bearerToken = req.headers['authorization'];
    if (!bearerToken) {
        res.status(404).send('Token not match');
        return;
    }
    let token = bearerToken.trim().split(' ')[1];
    jwt.verify(token, secretKey, (err, auth) => {
        if (err) res.status(403).send('Permission denied');
        else {
            let tokenData = atob(token);

            let userData = tokenData.trim().split('}')[1];
            if (!userData) {
                res.status(401).send('User info not found in token');
                return;
            }
            userData = JSON.parse(userData + '}');
            if (userData.role != 'admin' && userData.role != 'manager') {
                res.status(403).send('Permission denied 2');
                return;
            }
            req.body.email = userData.email;
            return next();
        }
    })
}

module.exports = {
    checkRoleAdmin,
    checkLogin,
    checkRoleManager
}