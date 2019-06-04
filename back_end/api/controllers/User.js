const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserDetail = mongoose.model('UserDetail');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const multer = require('multer');
const atob = require('atob');
const {gfs} = require('../helpers/uploadImage');
const crypto = require('crypto');
const {transporter} = require('../helpers/nodemailer')
const {removeSignString} = require('../helpers/removeSignText')
const {getSubImage} = require('../helpers/uploadImage')
let SaleOrder = mongoose.model('SaleOrder');

const find = async (req, res) => {
    try {
        let {page, role, limit, search_text} = req.query;
        console.log(req.query)
        let users = await User.find(role && role != '' ? {role} : {}).populate('user_detail_id');
        let user_search = await users.filter(item => !search_text || removeSignString(item.email).indexOf(removeSignString(search_text)) >= 0 || (item.user_detail_id && item.user_detail_id.name &&  removeSignString(item.user_detail_id.name).indexOf(removeSignString(search_text)) >= 0) || (item.user_detail_id && item.user_detail_id.phone_number &&  removeSignString(item.user_detail_id.phone_number).indexOf(removeSignString(search_text)) >= 0));
        let result = await user_search.slice((page-1)* limit, limit);
        let resultWithImage = await Promise.all(result.map(async item => {
            item.avatar = await getSubImage(item.avatar);
            return item;
        }))
        res.status(200).send({employees:result, employee_count: user_search.length});
    }
    catch (err) {
        res.status(400).send(err);
    }
}

const register = (req, res) => {
    const {email, password, role} = req.body;
    const {filename} = req.file
    User.findOne({ email }, (err, matchUser) => {
        if (matchUser) {
            res.status(404).send('Email is exist');
        }
        else {
            user = new User({ email, role, avatar : filename, resetPasswordToken: '', resetPasswordExpires: new Date()});
            user.generateHash(password);
            user.save((err, result) => {
                if (err) {
                    res.status(400).send(err.message);
                }
                else {
                    res.status(201).send('Registered');
                }
            });
        }
    })
}

const checkToken = (req, res) => {
    let { token } = req.body;
    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (decoded) {
            User.findOne({email:decoded.email}).populate('user_detail_id').then(async user => {
                user.avatar = await getSubImage(user.avatar);
                res.status(200).send({email: user.email, role: user.role,avatar: user.avatar, user_detail_id: user.user_detail_id, user_id: user._id})
            })
            .catch(err => { res.status(400).send(decoded);})
        }
        else res.status(404).send(err);
    })
}

const login = (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email, }, (err, user) => {
        if (err) {
            res.status(404, err.message);
        }
        else {
            if (user && user.validPassword(password)) {
                let token = jwt.sign({
                    email: user.email,
                    role: user.role,
                }
                    , config.secretKey
                    , { expiresIn: '5d' }
                    , (err, token) => {
                        if (err) {
                            res.status(404).send('Can not create token');
                        }
                        else {
                            res.status(200).send({ token })
                        }
                    })
            }
            else {
                res.status(400).send('Login failed');
            }
        }
    })
}

const forgotPassword = (req, res) => {
    if(!req.body.email || req.body.email == ''){
        res.status(400).send('Email required');
    }
    User.findOne({email: req.body.email}).then(user => {
        if(user == null){
            res.status(404).send('Email not in database');
        }
        else {
            const token = crypto.randomBytes(16).toString('hex');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;
            user.save();
            const output = `<p>Bạn nhận được email này vì bạn (hoặc một người nào đó) đã đề nghị đặt lại email cho tài khoản Vinmus của bạn. <p>` + 
            `<p>Vui lòng nhấp vào liên kết này, hoặc copy nó vào ô địa chỉ của cửa sổ trình duyệt trong vòng một tiếng kể từ khi bạn nhận được email này: <p>` + 
            `<link>http://localhost:3000/reset/${token} </link>`  + 
            `<p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua và mật khẩu của bạn không thay đổi<p>`
            const mailOptions = {
                from: 'Nhóm hỗ trợ Vinmus comunity',
                to: `${user.email}`,
                subject: 'Reset email request',
                html: output
            };
            transporter.sendMail(mailOptions, (err,response) => {
                if(err){
                    res.status(403).send('Cannot send email');
                }
                else{
                    res.status(200).send(response)
                }
            })
        }
    })
}

const checkResetToken = (req, res) => {
    const {token} = req.query;
    User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}}).then(user => {
        if(user != null) {
            res.status(200).send({message:'Link_OK',email: user.email});
        }
    })
}

const setNewPassword = (req, res) => {
    const {token, password, email} = req.body;
    User.findOne({email,resetPasswordToken: token}).then(user => {
        if(user ==  null) {
            res.status(404).send('Account not found');
        }
        else {
            user.generateHash(password);
            user.save();
            res.status(200).send('Password is updated');
        }
    })
    .catch(err => {
        res.status(404).send('Account not found');
    })
} 

const updateUserDetail = async (req, res) => {
    try{
        const {email,name, phone_number, gender, address,birthday} = req.body;
        let user = await User.findOne({email});
        if(user ==  null) {
            res.status(404).send('Account not found');
        }
        else {
            let userDetail = await UserDetail.findOne({_id: user.user_detail_id})
            if(userDetail == null) {
                newUserDetail = new UserDetail();
                newUserDetail.name = name;
                newUserDetail.phone_number = phone_number;
                newUserDetail.gender = gender;
                newUserDetail.address = address;
                newUserDetail.birthday = birthday;
                let savedUserDetail = await newUserDetail.save();
                user.user_detail_id = savedUserDetail._id;
                await user.save();
                await res.status(201).send('Created')
            }
            else {
                userDetail.name = name || userDetail.name;
                userDetail.address = address || userDetail.address;
                userDetail.phone_number = phone_number || userDetail.phone_number;
                userDetail.birthday = birthday || userDetail.birthday;
                userDetail.gender = gender || userDetail.gender;
                await userDetail.save();
                await res.status(201).send('Updated')
            }
        }
    }
    catch(err){
        res.status(400).send('Can not update')
    }
} 

const updateUserAvatar = (req, res) => {
    User.findOne({email:req.body.email}).then(user => {
        if(user != null) {
           user.avatar = req.file.filename;
           user.save().then(result => {
               res.status(200).send('Updated');
           })
           .catch(err => {
               res.status(400).send(err)
           })
        }
    })
    .catch(error => {
        res.status(400).send('Cannot find email');
    })
}

const getEmployeeDetail = async (req, res) => {
    try {
        let {id} = req.query;
        let user = await User.findOne({_id:id}).populate('user_detail_id');
        user.avatar = await getSubImage(user.avatar)
        // res.status(200).send({employees:result, employee_count: user_search.length});
        let saleOrders = await SaleOrder.find({seller_id:id}).limit(5).select({_id:1,no:1,createdAt:1, total_amount:1}).sort({createdAt:-1});
        let saleOrderReports = await SaleOrder.find({seller_id:id, createdAt: {$lte:new Date() , $gte: new Date(parseInt((new Date()).getFullYear()),1,1)}}).select({createdAt:1,total_amount: 1})
        await res.status(200).send({user:user, top_5_sale_orders: saleOrders, sale_reports: saleOrderReports});
    }
    catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    find,
    register,
    login,
    checkToken,
    forgotPassword,
    checkResetToken,
    setNewPassword,
    updateUserDetail,
    updateUserAvatar,
    getEmployeeDetail
}