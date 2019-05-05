import React from 'react'
import history from '../../history';
import {put, call} from 'redux-saga/effects';
//import {Redirect} from 'react-router-dom'
export function* handleRouteScreen(action) {
    try {
        switch (action.payload){
            case '/':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:{screen: 'products'}})
                //return (<Redirect to = '/products'/>)
                yield call(history.push,'/');
                break;
            }
            case 'products':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:{screen: 'products'}})
                //return (<Redirect to = '/products'/>)
                yield call(history.push,'/');
                break;
            }
            case 'employees':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:{screen: 'employees'}})
                //return (<Redirect to = '/employees'/>)
                yield call(history.push,'/employees');
                break;
            }
            case 'about':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:{screen: 'about'}})
                //return (<Redirect to = '/about'/>)
                yield call(history.push,'/about');
                break;
            }
            default:{
                yield call(history.push,action.payload)
            }
        }
        
    }
    catch(err){}
}