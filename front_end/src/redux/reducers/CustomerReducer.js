const initialState = {
    customers: [],
    customer: {}
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
        default:{
            return state
        }
    }
}

export default CustomerReducer