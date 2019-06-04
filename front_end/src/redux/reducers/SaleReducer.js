const initialState = {
    top_product_sale:null,
    top_product_discount: null
}

export const SaleReducer = (state = initialState, action) => {
    switch(action.type){
        case 'TOP_DISCOUNT_PRODUCT_LOADED':{
            return {...state, top_product_discount: action.payload}
        }
        case 'TOP_SALE_PRODUCT_LOADED':{
            return {...state, top_product_sale: action.payload}
        }
        default: {
            return state;
        }
    }
}

export default SaleReducer