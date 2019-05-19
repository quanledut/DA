import React from 'react'
import history from '../../history';
import {put, call} from 'redux-saga/effects';
export function* handleRouteScreen(action) {
    try {
        switch (action.payload){
            case '/':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:'products'})
                yield call(history.push,'/');
                break;
            }
            case 'products':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:'products'})
                yield call(history.push,'/');
                break;
            }
            case 'employees':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:'employees'})
                yield call(history.push,'/employees');
                break;
            }
            case 'about':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:'about'})
                yield call(history.push,'/about');
                break;
            }
            case '/saleorder/payment':{
                //yield put({type: 'SET_MAIN_SALE_ORDER_AMOUNT', payload:action.amount})
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:action.payload})
                yield call(history.push,'/saleorder/payment');
                break;
            }
            case '/saleorder/customer':{
                yield put({type: 'SET_MAIN_SALE_ORDER_SUB_AMOUNT', payload:action.amount});
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:action.payload})
                yield call(history.push,action.payload);
                break;
            }
            default:{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:action.payload})
                yield call(history.push,action.payload)
            }
        }
        
    }
    catch(err){}
}