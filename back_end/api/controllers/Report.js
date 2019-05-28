const mongoose = require('mongoose');
const SaleOrder = mongoose.model('SaleOrder');
const User = mongoose.model('User');
const UserDetail = mongoose.model('UserDetail')

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
    
const getSaleReport = (req, res) => {
    SaleOrder.aggregate([
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
    ]).then(docs => {
        res.status(200).send(docs)
    }).catch(err => {
        res.status(403).send(err)
    })
}

module.exports = {
    getTopSaleEmployee,
    getSaleReport
}