import React from 'react'
import history from '../../history';
import {put, call} from 'redux-saga/effects';
import {numberOfCustomerPerPage} from '../../config' 

export function* handleRouteScreen(action) {
    try {
        switch (action.payload){
            default:{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:action.payload})
                yield call(history.push,action.payload)
            }
        }
        
    }
    catch(err){}
}