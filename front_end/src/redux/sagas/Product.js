import { call, put, } from 'redux-saga/effects';
import { checkToken } from '../../api/AccountApi';
import { apiUrl } from '../../config'
import { loadDepartment, requestNewProduct, loadProduct, getProductDetail } from '../../api/ProductApi'
import { NotificationManager } from 'react-notifications';

export function* LoadDepartment() {
    try {
        let departments = yield call(loadDepartment);
        yield put({ type: 'LOAD_DEPARTMENT_SUCCESS', payload: departments })
    }
    catch (err) {
        yield put({ type: 'LOAD_DEPARTMENT_FAILED', payload: err })
    }
}

export function* RequestNewProduct(action) {
    try {
        let product = yield call(requestNewProduct, action.payload);
        NotificationManager.success('Đã tạo sản phẩm', 'Success', 3000);
        //yield put({type: })
        yield put({ type: 'SCREEN_ROUTER', payload: '/' })
    }
    catch (err) {
        NotificationManager.error('Lỗi khi tạo mới sản phẩm', 'Error', 3000);
    }
}

export function* LoadProduct(action) {
    try {
        let response = yield call(loadProduct, action.payload)
        yield put({ type: 'LOAD_PRODUCT_SUCCESS', payload: response });
    }
    catch (err) {
        yield put({ type: 'LOAD_PRODUCT_FAILED' })
    }
} 

export function* ShowProductDetail(action){
    try{
        let product = yield call(getProductDetail, action.payload);
        yield put({type: 'LOAD_PRODUCT_DETAIL_SUCCESS', payload: product})
        yield put({type: 'SCREEN_ROUTER', payload:`/products/${action.payload}`})
    }
    catch(err){
        yield put({type: 'LOAD_PRODUCT_DETAIL_FAILED', payload: err});
    }
}