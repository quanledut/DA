const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const multer = require('multer');
const atob = require('atob')


const find = async (req, res) => { 
    try{
        let users = await User.find({});
        res.status(200).send(users);
    }
    catch(err){
        res.status(400).send(err);
    }
}
const register = (req, res) => {
    if(!req.is('application/json')){
        res.status(400).send('Invalid datatype');
    }
    else{
        let {email, password, role, avatar} = req.body;
        User.findOne({email}, (err, matchUser)=>{
            if(matchUser){
                res.status(404).send('Email is exist');
            }
            else{
                    user = new User({email, role, avatar});
                    user.generateHash(password);
                    user.save((err,result)=>{
                        if(err){
                            res.status(400).send(err.message);
                        }
                        else{
                            res.status(201).send('Registered');
                        }
                    });
                }
        })
    }
}

const checkToken = (req, res) => {
    let {token} = req.body;
    jwt.verify(token, config.secretKey,(err,decoded) => {
        if(decoded) {
            res.status(200).send(decoded);
        }
        else res.status(404).send(err);
    })
}

const login = (req, res) => {
    let {email, password} = req.body;
    User.findOne({email}, (err, user)=>{
        if(err){
            res.status(404,err.message);
        }
        else{
            if(user && user.validPassword(password)){
                console.log(user)
                let token = jwt.sign({
                    email: user.email,
                    role: user.role,
                }
                ,config.secretKey
                ,{expiresIn: '1h'}
                ,(err, token) =>{
                    if(err){
                       res.status(404).send('Can not create token'); 
                    }
                    else{
                        console.log('.'+token+'.')
                        console.log(atob(token))
                        res.status(200).send({token})
                    }
                })
            }
            else{
                res.status(400).send('Login failed');
            }
        }
    })
}

const uploadIcon = (req, res) => {

}

module.exports = {
    find,
    register,
    login,
    checkToken,
    uploadIcon
}