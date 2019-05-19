import { call, put, } from 'redux-saga/effects';
import { checkToken } from '../../api/AccountApi';
import { apiUrl } from '../../config'
import {  loadSaleOrderList,reloadSaleOrder, createNewSaleOrder, loadSaleOrderDetail,nextStateSaleOrder
    } from '../../api/SaleOrderApi'
import { NotificationManager } from 'react-notifications';

export function* CleanSaleOrder(){
    console.log('CLEAN SALEORDER')
    localStorage.removeItem('SaleOrder',() => console.log(localStorage.getItem('SaleOrder')))
}

export function* LoadSaleOrderLocal() {
    let SaleOrder = JSON.parse(localStorage.getItem('SaleOrder'));
    if(SaleOrder != null)
    {
        yield put({type:'RELOAD_SALE_ORDER_SUCCESS',payload: SaleOrder})
    }
}

export function* UpdateSaleOrderItem(action){
    console.log('Update SaleOrder payload: '+ action.payload)
    localStorage.setItem('SaleOrder',JSON.stringify(action.payload));
    yield put({type: 'UPDATED_SALE_ORDER_ITEM_STORAGE', payload: action.payload});
}

export function* ReloadSaleOrder(action){
    try{
        let SaleOrder = yield call(reloadSaleOrder, action.payload)
        yield put({type: 'RELOAD_SALE_ORDER_SUCCESS',payload: SaleOrder})
    }
    catch(err){
        yield put({type: 'RELOAD_SALE_ORDER_FAILED',payload: err})
    }
}

export function* CreateNewSaleOrder(action){
    try{
        yield call(createNewSaleOrder,action.token, action.payload);
        NotificationManager.success('Đã tạo đơn hàng', 'Success', 2000)
        yield put({type:'CREATE_NEW_SALE_ORDER_SUCCESS'});
        yield put({type:'SCREEN_ROUTER', payload:'/saleorder/success'})
    }
    catch(err){
        NotificationManager.error('Lỗi khi tạo đơn hàng', 'Error', 2000)
        yield put({type:'CREATE_NEW_SALE_ORDER_FAILED'});
    }
} 

export function* LoadSaleOrderList(action){
    try{
        let data = yield call(loadSaleOrderList,action.token, action.payload);
        yield put({type:'SALE_ORDER_LIST_LOADED', payload: data});
    }
    catch(err){
        yield put({type:'SALE_ORDER_LIST_LOAD_FAILED', payload: err});
    }
} 

export function* LoadSaleOrderDetail(action){
    try{
        let data = yield call(loadSaleOrderDetail,action.token, action.payload);
        yield put({type:'SALE_ORDER_DETAIL_LOADED', payload: data});
        yield put({type: 'SCREEN_ROUTER', payload:`/saleorders/${action.payload}`})
    }
    catch(err){
        yield put({type:'SALE_ORDER_DETAIL_LOAD_FAILED', payload: err});
    }
} 

export function* GoToNextStateSaleOrder(action){
    try{
        let data = yield call(nextStateSaleOrder,action.token, action.payload);
        yield put({type:'SALE_ORDER_NEXT_STATE_SUCCESS', payload: data});
        yield put({type:'SHOW_SALE_ORDER_DETAIL', payload: action.payload, token: action.token});
        yield put({type: 'SCREEN_ROUTER', payload:`/saleorders/${action.payload}`})
    }
    catch(err){
        yield put({type:'SALE_ORDER_DETAIL_LOAD_FAILED', payload: err});
    }
} 
