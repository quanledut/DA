import {call,put, } from 'redux-saga/effects';
import {checkToken} from '../../api/LoginApi'

export function* LoadUser(){
	try{
		let token = yield localStorage.getItem('token');
		console.log(`Token: ${token}`);
		const res = yield call(checkToken,token);
		yield put({type:'TOKEN_CHECKED'})
	}
	catch(err){
		localStorage.removeItem('token');
		yield put({type: 'TOKEN_NOT_CHECKED'})
	}
};	
