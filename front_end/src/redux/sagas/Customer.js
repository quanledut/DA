import {createNewCustomer, getAllCustomer, getCustomersList, getCustomerDetail} from '../../api/CustomerApi';
import {call, put} from 'redux-saga/effects';
import {NotificationManager} from 'react-notifications'
export function* CreateNewCustomer(action) {
    try{
        yield call(createNewCustomer,action.payload,action.token);
        yield NotificationManager.success('Đã thêm khách hàng','Success',2000);
        yield put({type: 'CREATE_NEW_CUSTOMER_SUCCESS'});
        yield put({type: 'GET_ALL_CUSTOMERS',token:action.token})
    }
    catch(err){
        yield NotificationManager.error('Lỗi khi tạo khách hàng','Error',2000);
        yield put({type: 'CREATE_NEW_CUSTOMER_FAILED'});
    }
}

export function* GetAllCustomers(action) {
    try{
        let customers = yield call(getAllCustomer, action.token);
        yield put({type: 'CUSTOMERS_LOADED', payload: customers})
    }
    catch(err){
        yield put({type: 'CUSTOMERS_LOAD_FAILED', payload: err})
    }
}

export function* GetCustomersList(action) {
    try{
        let customers = yield call(getCustomersList, action.token,  action.payload);
        yield put({type: 'CUSTOMERS_LIST_LOADED', payload: customers})
    }
    catch(err){
        yield put({type: 'CUSTOMERS_LOAD_FAILED', payload: err})
    }
}

export function* GetCustomerDetail(action) {
    try{
        let customer = yield call(getCustomerDetail, action.token,  action.payload);
        yield put({type: 'CUSTOMERS_DETAIL_LOADED', payload: customer})
        yield put({type: 'SCREEN_ROUTER', payload:`/customers/${action.payload}`})
    }
    catch(err){
        yield put({type: 'CUSTOMERS_DETAIL_LOAD_FAILED', payload: err})
    }
}

