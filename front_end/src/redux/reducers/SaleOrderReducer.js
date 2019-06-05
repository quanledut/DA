const initialState = {
    SaleOrders: [],
    SaleOrderCount: 0,
    SaleOrder: {}
};

export const SaleOrderReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SALE_ORDER_LIST_LOADED':{
            return {...state, SaleOrders: action.payload.sale_orders, SaleOrderCount: action.payload.sale_order_count}
        }
        case 'SALE_ORDER_DETAIL_LOADED':{
            return {...state, SaleOrder: action.payload}
        }
        case 'SALE_ORDER_ITEM_NOT_ENOUGHT_INVENTORY':{
            return {...state, SaleOrder:{...state.SaleOrder, items: state.SaleOrder.items.map(item => {
                let ne_item = action.payload.find((n_e_item => {return n_e_item.id == item.product_id._id}));
                if(ne_item) {
                    item.not_enounght_inventory = true;
                    item.not_enounght_inventory_qty = ne_item.qty;
                }
                return item;
            })}}
        }
        case 'UPDATE_SALE_ORDER_ITEM_DETAIL':{
            let subTotalAmount = action.payload.items.reduce((total, item) => {
                                            return total + parseFloat(item.sale_price) * parseFloat(item.qty)
                                        }, 0)
            return {...state, SaleOrder:{...action.payload,sub_total_amount: subTotalAmount,
                                                            total_amount : subTotalAmount*(100 - parseFloat(action.discount || 0)) /100
            }}
        }
        default:{
            return state
        }
    }
}

export default SaleOrderReducer