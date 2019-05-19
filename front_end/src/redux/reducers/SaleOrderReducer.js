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
        default:{
            return state
        }
    }
}

export default SaleOrderReducer