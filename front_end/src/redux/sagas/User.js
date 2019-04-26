import {call,put, } from 'redux-saga/effects';
import {checkToken} from '../../api/AccountApi';
import atob from 'atob'

export function* LoadUser(){
	try{
		let token = yield localStorage.getItem('token');
		const res = yield call(checkToken,token);
		let userInfo = yield JSON.parse(atob(token.trim().split('.')[1]))
		yield put({type:'TOKEN_CHECKED',
					payload: {
						email: userInfo.email,
						role: userInfo.role
					}})
	}
	catch(err){
		localStorage.removeItem('token');
		yield put({type: 'TOKEN_NOT_CHECKED'})
	}
};	

export function* handleLogout(action) {
	try{
		yield localStorage.removeItem('token');
		yield put({
			type: 'LOGOUT'
		})
	}
	catch(err){}
}

export function* RequestLogin(action){
	try{
	}
	catch(err){
		localStorage.removeItem('token');
		yield put({type: 'TOKEN_NOT_CHECKED'})
	}
};	

