import { stat } from "fs";

const initialState = {
    departments: [],
    products: [],
    product: {},
    department: {},
    productCount: 0,
    saleOrderItemCount: 0,
    SaleOrder: []
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_DEPARTMENT_SUCCESS': {
            return {
                ...state, departments: [{
                    name: 'all',
                    caption: 'Tất cả'
                },...action.payload]
            }
            break;
        }
        case 'HANDLE_CHANGE_DEPARTMENT':{
            return {
                ...state, department: state.departments.filter(dept => dept.name === action.payload)[0]
            }
        }
        case 'LOAD_PRODUCT_SUCCESS':{
            return {
                ...state, products: action.payload.products, productCount: action.payload.productCount
            }
        }
        case 'LOAD_PRODUCT_DETAIL_SUCCESS':{
            return {
                ...state, product: action.payload
            }
        }
        case 'CHANGE_SALEORDER':{
            let SaleOrder = localStorage.getItem('SaleOrder');
            console.log(JSON.stringify(SaleOrder))
            if(SaleOrder) 
            return {
                ...state, saleOrderItemCount: SaleOrder.length
            }
        }
        case 'LOADED_SALE_ORDER':{
            console.log('Loaded saleOrder' + action.payload)
            if(action.payload != null){
                return {
                    ...state, SaleOrder: action.payload, saleOrderItemCount: action.payload.count
                }
            }
            else return state
        }
        case 'ADD_PRODUCT_TO_ORDERS':{
            if(state.SaleOrder.length > 0){
                let SaleOrderItem = state.SaleOrder.filter(item => item.productId == action.payload.productId);
                if(SaleOrderItem.length > 0){
                    let NewSaleOrder = state.SaleOrder.map(item => { if(item.productId == action.payload.productId) item.productQty += action.payload.productQty; return item})
                    console.log(NewSaleOrder);
                    return {
                        ...state, SaleOrder: NewSaleOrder, saleOrderItemCount: NewSaleOrder.length
                    }
                }
            }
            return {...state, SaleOrder: [...state.SaleOrder,action.payload], saleOrderItemCount: state.saleOrderItemCount + 1}
        }
        default: {
            return state;
        }
    }
}

export default ProductReducer