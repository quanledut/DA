const jwt = require('jsonwebtoken');
const config = require('../../config')

const auth = (req, res, next) => {
    let bearerToken = req.headers['authorization'];
    if(!bearerToken){
        res.status(400).send('Authentication info not match');
    }
    else{
        token = bearerToken.trim().split(' ')[1];
        req.token = token;
        console.log(token);
        jwt.verify(token, config.secretKey, (err, auth) => {
            if(err){
                res.status(404).send('Authentication failed');
            }
            else{
                // res.status(200).send(auth);
                next();
            }
        })
    }
}

module.exports = {
    auth
}