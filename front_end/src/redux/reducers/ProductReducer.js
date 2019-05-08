const initialState = {
    departments: [],
    products: [],
    product: {},
    department: {},
    productCount: 0
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
        default: {
            return state;
        }
    }
}

export default ProductReducer