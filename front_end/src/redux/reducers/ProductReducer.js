const initialState = {
    departments: [],
    products: [],
    product: {},
    department: {}
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
        default: {
            return state;
        }
    }
}

export default ProductReducer