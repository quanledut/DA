const mongoose = require('mongoose')
const SaleOrder = mongoose.model('SaleOrder')
const Product = mongoose.model('Product')
const {getSubImage} = require('../helpers/uploadImage');
const {removeSignString} = require('../helpers/removeSignText');
const {getProductDetail} = require('./Product/Product');
const {checkInventoryQty, divideInventoryStock} = require('../helpers/Product');
const UserDetail = mongoose.model('UserDetail')
const find = async (req, res) => {
    try {
        const {page,limit,search_text,status} = req.query;
        let saleOrders = await SaleOrder.find(status && status != 'all' ? {status} : {}).sort({createdAt:-1}).populate('customer_id').populate('seller_id').populate('seller_id.user_detail_id');
        saleOrders = await UserDetail.populate(saleOrders,'seller_id.user_detail_id');
        console.log(saleOrders.length)
        if(!saleOrders && saleOrders.length == 0){
            res.status(200).send({sale_order_count: 0,sale_orders: []
            })
        }
        else{
            let saleOrderFilter = (search_text && search_text != '') ? 
                saleOrders.filter(item => 
                        removeSignString(item.no).indexOf(removeSignString(search_text)) >= 0
                         || (((!item.customer_id || !item.customer_id.name) &&  removeSignString(item.no).indexOf(removeSignString(search_text)) >= 0)
                             || (item.customer_id && item.customer_id.name && removeSignString(item.customer_id.name).indexOf(removeSignString(search_text)) >= 0)) 
                         || (((!item.seller_id || !item.seller_id.user_info_id || !item.seller_id.user_info_id.name) && removeSignString(item.no).indexOf(removeSignString(search_text)) >= 0)
                             || (item.seller_id && item.seller_id.user_info_id && item.seller_id.user_info_id.name && removeSignString(item.seller_id.user_info_id.name).indexOf(removeSignString(search_text)) >= 0))
                        )
                        : saleOrders
                let result = saleOrderFilter.slice((page - 1) * limit, page * limit);
                res.status(200).send({sale_order_count:saleOrders.length, sale_orders: result});
        }   
    }
    catch (err) {
        res.status(400).send(err);
    }
}

const requestNewSaleOrder = async (req, res) => {
    try{
        const {sub_total_amount,discount,total_amount,paid_amount,payment_type,bank_name,bank_number,
            shipment_type,shipment_date,shipment_address,receiver_phone_number,receiver_name,items, customer_id, seller_id} = req.body;
        let saleOrder = new SaleOrder();
        let newestSaleOrder = await SaleOrder.findOne().sort({createdAt: -1});
        if(!newestSaleOrder){
            saleOrder.no = 'ĐBH-0001'
        }
        else {
            let newIndexNo = '000' + (parseInt(newestSaleOrder.no.split('-')[1]) + 1);
            saleOrder.no = 'ĐBH-' + newIndexNo.substring(newIndexNo.length - 4, newIndexNo.length)
        }
        saleOrder.customer_id = customer_id
        saleOrder.sub_total_amount = sub_total_amount;
        saleOrder.discount = discount;
        saleOrder.total_amount = total_amount;
        saleOrder.paid_amount = paid_amount;
        saleOrder.payment_type = payment_type;
        saleOrder.bank_name = bank_name;
        saleOrder.bank_number = bank_number;
        saleOrder.shipment_type = shipment_type;
        saleOrder.shipment_date = shipment_date;
        saleOrder.shipment_address = shipment_address;
        saleOrder.receiver_phone_number = receiver_phone_number;
        saleOrder.receiver_name = receiver_name;
        saleOrder.items = items;
        saleOrder.status = 'New';
        saleOrder.seller_id = seller_id;
        let result = await saleOrder.save();
        res.status(201).send(result);
    }
    catch(err){
        res.status(400).send(err)
        }
}

const getSaleOrderById = (req, res) => {
    const {id} = req.params;
    SaleOrder.findOne({_id:id}).populate('customer_id').populate('seller_id').populate('items.product_id').then(async saleOrder => {
        if(saleOrder != null) {
                saleOrder.items = await Promise.all(saleOrder.items.map(async saleOrderItem => {
                    console.log(saleOrderItem.product_id.subImage);
                    saleOrderItem.product_id.subImage = await getSubImage(saleOrderItem.product_id.subImage)
                    return saleOrderItem
                })) 
               res.status(200).send(saleOrder)
        }
        else res.status(404).send('Not found');
    })
    .catch(err =>
        {
            res.status(404).send(err);
        })
}

const nextStatusSaleOrder = (req, res) => {
    const {id} = req.params;
    SaleOrder.findOne({_id:id}).then(async saleOrder => {
        try{
            if(saleOrder != null) {
                await Promise.all(saleOrder.items.map(async saleOrderItem => {
                   checkInventoryQty(saleOrderItem);
                if(saleOrder.status ==  'New') {
                    await Promise.all(saleOrder.items.map(async saleOrderItem => {
                    divideInventoryStock(saleOrderItem);
                 })) 
                }
                saleOrder.status = await saleOrder.status == 'New' ? 'Confirmed' : 'Done'
                await saleOrder.save();
                })) 
               res.status(200).send(saleOrder)
        }
        else res.status(404).send('Not found');
        }
        catch(err){
            res.status(403).send(err)
        }
        
    })
    .catch(err =>
        {
            res.status(403).send(err);
        })
}

module.exports = {
    find,
    requestNewSaleOrder,
    getSaleOrderById,
    nextStatusSaleOrder,
}