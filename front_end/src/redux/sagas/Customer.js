import {createNewCustomer, getAllCustomer} from '../../api/CustomerApi';
import {call, put} from 'redux-saga/effects';
import {NotificationManager} from 'react-notifications'
export function* CreateNewCustomer(action) {
    try{
        yield call(createNewCustomer,action.payload,action.token);
        yield NotificationManager.success('Đã thêm khách hàng','Success',2000);
        yield put({type: 'CREATE_NEW_CUSTOMER_SUCCESS'});
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