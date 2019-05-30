const initialState = {
    departments: [],
    products: [],
    product: {
        product:null,
        customer_buyed: null,
        top_product_buy_with: null
    },
    department: {},
    productCount: 0,
    SaleOrder: [],
    MainSaleOrder: {
        payment_type: 'direct',
        shipment_type: 'company_shipping',
        discount: 0,
        shipment_date: '',
        receiver_name: '',
        total_amount: 0,
        shipment_address: '',
        bank_name: '',
        bank_number: '',
        receiver_phone_number: '',
        paid_amount: 0,
        sub_total_amount: 0
    }
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
            break;
        }
        case 'LOAD_PRODUCT_SUCCESS':{
            return {
                ...state, products: action.payload.products, productCount: action.payload.productCount
            }
            break;
        }
        case 'LOAD_PRODUCT_DETAIL_SUCCESS':{
            return {
                ...state, product:{...state.product,product: action.payload}
            }
            break;
        }
        case 'LOAD_TOP_PRODUCT_BUY_WITH_SUCCESS':{
            return {
                ...state, product:{...state.product,top_product_buy_with: action.payload}
            }
            break;
        }
        case 'LOAD_CUSTOMER_BUYED_PRODUCT_SUCCESS':{
            return {
                ...state, product:{...state.product,customer_buyed: action.payload}
            }
            break;
        }
        case 'CHANGE_SALEORDER':{
            let SaleOrder = localStorage.getItem('SaleOrder');
            if(SaleOrder) 
            return {
                ...state
            }
            break;
        }
        case 'LOADED_SALE_ORDER':{
            if(action.payload != null){
                return {
                    ...state, SaleOrder: action.payload
                }
            }
            else return state;
            break;
        }
        case 'ADD_PRODUCT_TO_ORDERS':{
            if(state.SaleOrder.length > 0){
                let SaleOrderItem = state.SaleOrder.filter(item => item.product._id == action.payload.product._id);
                if(SaleOrderItem.length > 0){
                    let NewSaleOrder = state.SaleOrder.map(item => { if(item.product._id == action.payload.product._id) item.productQty = parseInt(item.productQty) + parseInt(action.payload.productQty) ; return item})
                    localStorage.setItem('SaleOrder',JSON.stringify(NewSaleOrder.map(item => {item.images = []; item.selected = false; return item })));
                    return {
                        ...state, SaleOrder: NewSaleOrder
                    }
                }
            }
            localStorage.setItem('SaleOrder',JSON.stringify([...state.SaleOrder,action.payload]));
            return {...state, SaleOrder: [...state.SaleOrder,action.payload]};
            break;
        }
        case 'RELOAD_SALE_ORDER_SUCCESS': {
            return {...state, SaleOrder: action.payload}
            break;
        }
        case 'UPDATED_SALE_ORDER_ITEM_STORAGE':{
            return {...state, SaleOrder: action.payload}
            break;
        }
        case 'CHANGE_DISCOUNT':{
            return {...state, MainSaleOrder: {...state.MainSaleOrder, discount: parseFloat(action.payload),
                                                 total_amount: state.MainSaleOrder.sub_total_amount * (100 - action.payload) / 100}}
            break;
        }
        case 'UPDATE_MAIN_SALE_ORDER':{
            return {...state,
                 MainSaleOrder: {...state.MainSaleOrder, shipment_type: action.payload.shipment_type,
                                                         payment_type:action.payload.payment_type,
                                                         shipment_date: action.payload.shipment_date,
                                                         receiver_name: action.payload.receiver_name,
                                                         shipment_address: action.payload.shipment_address,
                                                         bank_name: action.payload.bank_name,
                                                         bank_number: action.payload.bank_number,
                                                         paid_amount: action.payload.paid_amount,
                                                         receiver_phone_number: action.payload.receiver_phone_number
                                }}
            break;
        }
        case 'SET_MAIN_SALE_ORDER_AMOUNT': 
            return {...state, MainSaleOrder: {...state.MainSaleOrder,total_amount: action.payload}}
            break;
        case 'SET_MAIN_SALE_ORDER_SUB_AMOUNT': 
            return {...state, MainSaleOrder: {...state.MainSaleOrder,sub_total_amount: action.payload, total_amount: action.payload}};
            break;
        default: {
            return state;
        }
    }
}
export default ProductReducer
