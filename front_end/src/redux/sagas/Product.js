import { call, put, } from 'redux-saga/effects';
import { checkToken } from '../../api/AccountApi';
import { apiUrl } from '../../config'
import { loadDepartment, loadCurrencies, requestNewProduct, loadProduct, getProductDetail, changeProductDetail, reloadSaleOrder, createNewSaleOrder,
        loadTopProductBuyWith, loadCustomerBuyedProduct, loadAllProduct, deleteProduct
        } from '../../api/ProductApi'
import { NotificationManager } from 'react-notifications';

export function* LoadCurrencies() {
    try {
        let currencies = yield call(loadCurrencies);
        yield put({ type: 'LOAD_CURRENCIES_SUCCESS', payload: currencies })
    }
    catch (err) {
        yield put({ type: 'LOAD_CURRENCIES_FAILED', payload: err })
    }
}

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
        let product = yield call(requestNewProduct, action.token, action.payload );
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
        yield put({type: 'LOAD_PRODUCT_DETAIL_SUCCESS', payload: product, id: action.payload})
        // yield put({type: 'SCREEN_ROUTER', payload:`/products/${action.payload}`})
    }
    catch(err){
        yield put({type: 'LOAD_PRODUCT_DETAIL_FAILED', payload: err});
    }
}

export function* LoadTopProductBuyWith(action){
    try{
        let product = yield call(loadTopProductBuyWith, action.id);
        yield put({type: 'LOAD_TOP_PRODUCT_BUY_WITH_SUCCESS', payload: product, id:action.id})
        // yield put({type: 'SCREEN_ROUTER', payload:`/products/${action.payload}`})
    }
    catch(err){
        yield put({type: 'LOAD_TOP_PRODUCT_BUY_WITH_FAILED', payload: err});
    }
}

export function* LoadCustomerBuyedProduct(action){
    try{
        let product = yield call(loadCustomerBuyedProduct, action.id);
        yield put({type: 'LOAD_CUSTOMER_BUYED_PRODUCT_SUCCESS', payload: product, id:action.id})
        // yield put({type: 'SCREEN_ROUTER', payload:`/products/${action.payload}`})
    }
    catch(err){
        yield put({type: 'LOAD_CUSTOMER_BUYED_PRODUCT_FAILED', payload: err});
    }
}


export function* ChangeProductDetail(action){
    try {
        yield call(changeProductDetail,action.token, action.payload);
        NotificationManager.success('Đã cập nhật thông tin sản phẩm', 'Success', 2000);
        yield put({type: 'HANDLE_SHOW_PRODUCT_DETAIL',payload: action.payload._id})
    }   
    catch(err){
        NotificationManager.error('Lỗi khi cập nhật thông tin sản phẩm', 'Error', 2000);
    }   
}

export function* LoadAllProduct(action){
    try {
        let products = yield call(loadAllProduct);
        yield put({type: 'LOAD_ALL_PRODUCT_SUCCESS',payload: products})
    }   
    catch(err){
        yield put({type: 'LOAD_ALL_PRODUCT_ERR',payload: err});
    }   
}

export function* DeleteProduct(action){
    try {
        let products = yield call(deleteProduct, action.token, action.payload);
        NotificationManager.success('Đã xóa sản phẩm', 'Xóa thành công', 2000);
        yield put({type: 'DELETE_PRODUCT_SUCCESS',payload: products});
        yield put({type:'SCREEN_ROUTER', payload:'/'})
    }   
    catch(err){
        yield put({type: 'DELETE_PRODUCT_ERR',payload: err});
    }   
}





