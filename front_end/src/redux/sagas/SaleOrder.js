import { call, put, } from 'redux-saga/effects';
import { checkToken } from '../../api/AccountApi';
import { apiUrl } from '../../config'
import {  loadSaleOrderList,reloadSaleOrder, createNewSaleOrder, loadSaleOrderDetail,nextStateSaleOrder,
    updateSaleOrder} from '../../api/SaleOrderApi'
import { NotificationManager } from 'react-notifications';
import moment from 'moment';

export function* CleanSaleOrder(){
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
        let data = yield call(loadSaleOrderDetail, action.payload);
        yield put({type:'SALE_ORDER_DETAIL_LOADED', payload: data});
        yield put({type: 'SCREEN_ROUTER', payload:`/saleorders/${action.payload}`})
    }
    catch(err){
        yield put({type:'SALE_ORDER_DETAIL_LOAD_FAILED', payload: err});
    }
} 

export function* GoToNextStateSaleOrder(action){
    try{
        let data = yield call(nextStateSaleOrder, action.token,action.payload);
        NotificationManager.success(`Đã ${data.status == 'Confirmed' ? 'Xác nhận' : 'Hoàn tất'} đơn hàng vào lúc ${moment(new Date()).format('DD/MM/YYYY HH:mm:ss')}`, 'Thành công', 2000);
        yield put({type:'SALE_ORDER_NEXT_STATE_SUCCESS', payload: data});
        yield put({type:'LOAD_SALE_ORDER_DETAIL', payload: action.payload, token: action.token});
        yield put({type: 'SCREEN_ROUTER', payload:`/saleorders/${action.payload}`})
    }
    catch(err){
        console.log('Error: '+ JSON.stringify(err.response));
        if (err.response.status == 409) {
            NotificationManager.error('Không đủ số lượng sản phẩm trong kho cho các sản phẩm', 'Lỗi tồn kho', 2000);
            yield put({type: 'SALE_ORDER_ITEM_NOT_ENOUGHT_INVENTORY', payload: err.response.data}) 
        }
        else yield put({type:'SALE_ORDER_DETAIL_LOAD_FAILED', payload: err});
    }
} 

export function* UpdateSaleOrder(action){
    try{
        yield call(updateSaleOrder, action.token, action.payload);
        NotificationManager.success('Đã cập nhật đơn hàng', 'Xong', 2000);
        yield call(loadSaleOrderDetail, action.payload._id);
        yield put({type: 'UPDATE_SALE_ORDER_SUCCESSED'});
        yield put({type:'LOAD_SALE_ORDER_DETAIL', payload:action.payload._id})
    }
    catch(err){
        NotificationManager.error('Lỗi khi cập nhật đơn hàng', 'Lỗi', 2000)
        yield put({type:'UPDATE_SALE_ORDER_FAILED'});
    }
} 