const mongoose = require('mongoose');
const SaleOrder = mongoose.model('SaleOrder');
const User = mongoose.model('User');
const UserDetail = mongoose.model('UserDetail');
const Product = mongoose.model('Product');
const Customer = mongoose.model('Customer');
const {getSubImage} = require('../helpers/uploadImage')

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

const getTopSaleProduct = (req, res) => {
    SaleOrder.aggregate([
        {
            $match:{
                createdAt:{$gte:new Date(`${(new Date()).getFullYear()} 01 01`)}
            }
        },
        {
            $unwind:'$items'
        },
        {
            $group:{
                _id:'$items.product_id',
                count:{$sum:1}
            }
        },{
            $sort:{count:-1}
        },
        {
            $limit:5
        }
    ]).then(products => {
        res.status(200).send(products)
    }).catch(err => res.status(403).send(err))
}

const test = async (req, res) => {
    try{
    let {product_id} = req.params
    let saleOrders = await SaleOrder.aggregate([
        {
            $unwind:'$items'
        },
        {
            $match:{
                'items.product_id':mongoose.Types.ObjectId(product_id)
            }
        },
        {
            $project:{
                _id:1
            }
        },
        {
            $group:{
                _id:'$_id'
            }
        }
    ])
    // let saleOrderIdList = 
    let products = await SaleOrder.aggregate([
        {
            $match:{
                _id:{
                    $in: saleOrders.map(item => {return item._id})
                }
            }
        },
        {
            $unwind:'$items'
        },
        {
            $project:{
                'items.product_id':1
            }
        },
        {
            $match:{
                'items.product_id':{$ne:mongoose.Types.ObjectId(product_id)}    
            }
        },
        {
            $group:{
                _id:'$items.product_id',
                count:{$sum:1}
            }
        },{
            $sort: {count:-1}
        }
    ])
    let resultProduct = await Product.populate(products,'_id')
    resultProduct = await Promise.all(resultProduct.map(async item => {
        item._id.subImage = await getSubImage(item._id.subImage);
        return item;
    }))
    res.status(200).send(resultProduct)
    }
    catch(err) {
        res.status(403).send(err)
    }
}

module.exports = {
    getTopSaleEmployee,
    getSaleReport,
    getTopSaleProduct,
    test
}