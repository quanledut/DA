import {call, put} from 'redux-saga/effects';
import {importInventoryStock} from '../../api/StockApi';
import {NotificationManager} from 'react-notifications';
import moment from 'moment'

export function* ImportInventoryStock(action){
    try{
        let data = yield call(importInventoryStock,action.token, action.payload);
        NotificationManager.success(`Nhập kho hoàn tất vào ${moment(new Date()).format('DD/MM/YYYY HH:mm:ss')}`, 'Nhập kho hoàn tất', 2000)
        yield put({type:'IMPORT_STOCK_SUCCESS', payload: data});
        yield put({type: 'SCREEN_ROUTER', payload:`/`})
    }
    catch(err){
        NotificationManager.error('Nhập kho lỗi', 'Lỗi', 2000);
        yield put({type:'IMPORT_STOCK_SUCCESS', payload: err});
        
    }
} 
