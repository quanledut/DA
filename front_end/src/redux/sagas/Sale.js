import {call, put} from 'redux-saga/effects';
import {getTopSaleProduct,getTopDiscountProduct} from '../../api/SaleApi'

export function* LoadTopSaleProduct(action){
    try{
        let data = yield call(getTopSaleProduct);
        yield put({type:'TOP_SALE_PRODUCT_LOADED', payload: data});
    }
    catch(err){
        yield put({type:'TOP_SALE_PRODUCT_LOAD_FAILED', payload: err});
    }
} 

export function* LoadTopDiscountProduct(action){
    try{
        let data = yield call(getTopDiscountProduct);
        yield put({type:'TOP_DISCOUNT_PRODUCT_LOADED', payload: data});
    }
    catch(err){
        yield put({type:'TOP_DISCOUNT_PRODUCT_LOAD_FAILED', payload: err});
    }
} 