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
        case 'HANDLE_CHANGE_DEPARTMENT':{
            return {
                ...state, department: state.departments.filter(dept => dept.name == action.payload)[0]
            }
        }
        default: {
            return state;
        }
    }
}

export default ProductReducer