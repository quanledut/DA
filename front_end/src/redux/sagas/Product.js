import {call,put, } from 'redux-saga/effects';
import {checkToken} from '../../api/AccountApi';
import {apiUrl} from '../../config'
import {LoadProductDepartment} from '../../api/ProductApi'

export function* LoadDepartment(){
    try{
       let departments = yield call(LoadProductDepartment);
       yield put({type: 'LOAD_DEPARTMENT_SUCCESS', payload: departments})
    }
    catch(err){
        yield put({type: 'LOAD_DEPARTMENT_FAILED', payload: err})
    }
}

