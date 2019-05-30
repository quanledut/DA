const mongoose = require('mongoose');
const SaleOrder = mongoose.model('SaleOrder');
const User = mongoose.model('User');
const UserDetail = mongoose.model('UserDetail');
const Product = mongoose.model('Product');
const Customer = mongoose.model('Customer')

const getTopSaleEmployee = (req, res) => {
    SaleOrder.aggregate([
        {
            $match:{
                createdAt:{$gte:new Date(`${(new Date()).getFullYear()} 01 01`)}
            }
        },
        {
            $group:{
                _id: '$seller_id',
                total_amount:{$sum:'$total_amount'}
            }
        },
        {
            $sort:{
                total_amount:-1
            }
        },
        {
            $limit:5
        },
        {
            $lookup:{
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user_id'
            }
        },
        {
            $lookup:{
                from:'userdetails',
                localField: 'user_id.user_detail_id',
                foreignField: '_id',
                as: 'user_detail_id'
            }
        }
    ]).then(tops => {
        res.status(200).send(tops)
    })
    .catch(err => {
        res.status(403).send(err)
    })
}
    
const getSaleReport = async (req, res) => {
    try{
        let docs = await SaleOrder.aggregate([
            {
                $match:{
                    createdAt:{$gte:new Date(`${(new Date()).getFullYear()} 01 01`)}
                }
            },
            {
                $group:{
                    _id:{$month: '$createdAt'},
                    total_amount: {$sum:'$total_amount'}
                }
            },
            {
                $sort:{
                    _id: 1
                }
            }
        ])
        let productCount = await Product.count({status: {$nin:['deleted']}});
        let employeeCount = await User.count({status:{$nin:['deleted']}});
        let customerCount = await Customer.count({status:{$nin:['deleted']}});
        await res.status(200).send({docs, productCount, employeeCount, customerCount})
    }
    catch(err){
        res.status(403).send(err)
    }
}

module.exports = {
    getTopSaleEmployee,
    getSaleReport
}