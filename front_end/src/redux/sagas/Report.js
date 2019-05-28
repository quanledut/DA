import {call, put} from 'redux-saga/effects';
import {getSaleReport,getTopEmployee} from '../../api/ReportApi'

export function* LoadSaleReport(action){
    try{
        let data = yield call(getSaleReport,action.token);
        yield put({type:'SALE_REPORT_LOADED', payload: data});
        //yield put({type: 'SCREEN_ROUTER', payload:`/saleorders/${action.payload}`})
    }
    catch(err){
        yield put({type:'SALE_REPORT_LOAD_FAILED', payload: err});
    }
} 

export function* LoadTopEmployee(action){
    try{
        let data = yield call(getTopEmployee,action.token);
        yield put({type:'TOP_EMPLOYEE_LOADED', payload: data});
        //yield put({type: 'SCREEN_ROUTER', payload:`/saleorders/${action.payload}`})
    }
    catch(err){
        yield put({type:'TOP_EMPLOYEE_LOAD_FAILED', payload: err});
    }
} 