const initialState = {
    top_5_employee: [],
    sale_report: [],
    top_5_products:[],
    productCount: 0,
    employeeCount: 0,
    customerCount: 0
}

export const ReportReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SALE_REPORT_LOADED':{
            return {...state, 
                        sale_report:action.payload.docs, 
                        productCount: action.payload.productCount,
                        employeeCount: action.payload.employeeCount,
                        customerCount: action.payload.customerCount
                    }
            break;
        }
        case 'TOP_EMPLOYEE_LOADED':{
            return {...state, top_5_employee:action.payload}
        }
        default:{
            return state
        }
    }
}

export default ReportReducer