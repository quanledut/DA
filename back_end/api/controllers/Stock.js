const mongoose = require('mongoose');
const StockChange = mongoose.model('StockChange');
const User = mongoose.model('User');
const {addInventoryStock} = require('../helpers/Product')

const importStock = async (req, res) => {
    try{
        let {description,supplier_name,items, email} = req.body
        if(!items || items.length == 0){
            res.status(404).send('Item is empty');
        }
        else {
            let importUser = await User.findOne({email});
            console.log('User: ' + importUser);
            newStockChange = new StockChange(
                    {
                        description,
                        supplier_name,
                        type:'import',
                        user_id:importUser._id,
                        items:items.map(item => {
                            return {product_id:item._id, qty: item.qty, price: item.unitprice}
                        })
                    })
            let savedStockChange = await newStockChange.save();
            console.log('Saved Stock change')
            await Promise.all(items.map(async item => {
                await addInventoryStock(item);
            }))
            await res.status(200).send(savedStockChange);
        }
    }
    catch(err){
        res.status(404).send('Can not create import')
    }
}

module.exports = {
    importStock
}