const mongoose = require('mongoose')
const SaleOrder = mongoose.model('SaleOrder');
const Product = mongoose.model('Product');
const User = mongoose.model('User');
const StockChange = mongoose.model('StockChange');
const {getSubImage} = require('../helpers/uploadImage');
const {removeSignString} = require('../helpers/removeSignText');
const {getProductDetail} = require('./Product/Product');
const {checkInventoryQty, divideInventoryStock} = require('../helpers/Product');
const UserDetail = mongoose.model('UserDetail');
const {transporter} = require('../helpers/nodemailer');
const moment = require('moment');
const {front_end_base_url} = require('../../config')

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
    const {email} = req.body;
    SaleOrder.findOne({_id:id}).populate('seller_id').populate('customer_id').then(async saleOrder => {
        try{
            if(saleOrder != null) {
                let seller = await User.findOne({email});
                saleOrder = await UserDetail.populate(saleOrder,'seller_id.user_detail_id');
                stockChange = new StockChange({description:`Xuất kho đơn hàng ${saleOrder.no}`, type:'export', user_id: seller._id, saleorder_id: saleOrder._id, items:[]});
                if(saleOrder.status ==  'New') {
                    await Promise.all(saleOrder.items.map(async saleOrderItem => {
                        console.log(JSON.stringify(saleOrderItem))
                        divideInventoryStock(saleOrderItem);
                        await stockChange.items.push({product_id: saleOrderItem.product_id, qty:saleOrderItem.qty, price: saleOrderItem.sale_price});
                        await stockChange.save();
                    }));
                    const currentTime = new Date();
                    const content = `<p>Đơn hàng của bạn đã được xác nhận vào lúc ${moment(currentTime).format('DD/MM/YYYY HH:mm:SS')}</p>`+
                    `<p>Thông tin chi tiết đơn hàng tại </p>` + 
                    `${front_end_base_url}/saleorders/${saleOrder._id}` +
                    `<p>Nếu có bất kỳ câu hỏi nào vui lòng liên hệ nhân viên ${saleOrder.seller_id.user_detail_id.name} 
                        tại ${saleOrder.seller_id.user_detail_id.phone_number ? 'số điện thoại ' + saleOrder.seller_id.user_detail_id.phone_number : 'email' + saleOrder.seller_id.email}</p>`
                    const mailOptions = {
                        from: 'Nhóm hỗ trợ Vinmus comunity',
                        to: `${saleOrder.customer_id.email}`,
                        subject: 'Đã xác nhận đơn hàng',
                        html: content
                    };
                    
                    saleOrder.status = await 'Confirmed';
                    saleOrder.confirmed_user_id = seller._id;
                    transporter.sendMail(mailOptions);
                    await saleOrder.save().then(res.status(200).send(saleOrder))
                }
                else if(saleOrder.status == 'Done') {
                    res.status(404).send('Current Sale Order status is done')
                }
                else{
                    saleOrder.paid_amount = saleOrder.total_amount;
                    saleOrder.status = 'Done';
                    await saleOrder.save().then(res.status(200).send(saleOrder))
                }
            }
            else res.status(404).send('Not found');
        }
        catch(err){
            res.status(403).send('err')
        }
        
    })
    .catch(err =>
        {
            res.status(403).send('Can not find');
        })
}

const updateSaleOrder = async (req, res) => {
    try{
        const {id} = req.params;
        let newSaleOrder = req.body;
        let saleOrder = await SaleOrder.findOne({_id:id});
        await Object.assign(saleOrder, newSaleOrder);
        await saleOrder.save();
        await res.status(200).send(saleOrder)
    }
    catch(err){
        res.status(404).send('Query err')
    }
}

module.exports = {
    find,
    requestNewSaleOrder,
    getSaleOrderById,
    nextStatusSaleOrder,
    updateSaleOrder
}