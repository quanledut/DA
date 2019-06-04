const initialState = {
    employees:[],
    employee:{},
    employee_count: 0
}

export const EmployeeReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOAD_EMPLOYEE_LIST_SUCCESS':{
            return {...state, employees: action.payload.employees, employee_count: action.payload.employee_count};
            break;
        }
        case 'LOAD_EMPLOYEE_DETAIL_SUCESS':{
            return {...state, employee:action.payload}
        }
        default:{
            return state
        }
    }
}

export default EmployeeReducer