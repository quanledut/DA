const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('../../config');

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
        let {username, password} = req.body;
        User.findOne({username}, (err, matchUser)=>{
            if(matchUser){
                res.status(404).send('Username is exist');
            }
            else{
                    user = new User({username});
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

const login = (req, res) => {
    let {username, password} = req.body;
    User.findOne({username}, (err, user)=>{
        if(err){
            res.status(404,err.message);
        }
        else{
            if(user.validPassword(password)){
                let token = jwt.sign({username},config.secretKey,{expiresIn: '2m'},(err, token) =>{
                    if(err){
                       res.status(404).send('Can not create token'); 
                    }
                    else{
                        res.status(200).send({token})
                    }
                })
            }
            else{
                res.status(400).send('Password is wrong');
            }
        }
    })
}

module.exports = {
    find,
    register,
    login
}