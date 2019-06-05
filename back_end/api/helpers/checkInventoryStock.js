const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const SaleOrder = mongoose.model('SaleOrder');

const checkInventoryStock = async (req, res, next) => {
    try{
        let listProductNotEnoughtQty = [];
        const {id} = req.params;
        let saleOrder = await SaleOrder.findOne({_id:id});
        if(saleOrder.status == 'Confirmed' || saleOrder.status == 'Done'){
            next();
        }
        else{
            await Promise.all(saleOrder.items.map(async item => {
                let product = await Product.findOne({_id:item.product_id});
                if(product.importqty < item.qty){
                    listProductNotEnoughtQty.push({id:item.product_id, qty:item.qty - product.importqty})
                }
            }))
            if(listProductNotEnoughtQty.length > 0){
                await res.status(409).send(listProductNotEnoughtQty);
            }
            else next();
        }
    }
    catch(err){
        res.status(404).send('Loi khi check stock');
    }
}

module.exports = {
    checkInventoryStock
}