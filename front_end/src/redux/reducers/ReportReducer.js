const initialState = {
    top_5_employee: [],
    sale_report: [],
    top_5_products:[]
}

export const ReportReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SALE_REPORT_LOADED':{
            return {...state, sale_report:action.payload}
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