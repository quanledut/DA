const initialState = {
    customers: [],
    customer: {},
    customer_count: 0,
    customer_list: [],
    customer_detail: {}
}

export const CustomerReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CUSTOMERS_LOADED':{
            return {...state, customers: action.payload};
            break;
        }
        case 'SELECT_CUSTOMER':{
            return {...state, customer: action.payload};
            break;
        }
        case 'CUSTOMERS_LIST_LOADED':{
            return {...state, customer_count: action.payload.customer_count, customer_list: action.payload.customer_list}
        }
        case 'CUSTOMERS_DETAIL_LOADED':{
            return {...state, customer_detail: action.payload}
        }
        default:{
            return state
        }
    }
}

export default CustomerReducer