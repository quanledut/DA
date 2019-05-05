import { call, put, } from 'redux-saga/effects';
import { checkToken, signUp , requestForgotPassword, requestSetNewPassword} from '../../api/AccountApi';
import {LoadDepartment} from './Product'
import {NotificationManager} from 'react-notifications'

export function* LoadUser() {
	try {
		let token = yield localStorage.getItem('token');
		console.log('Token check: ' + token)
		const userInfo = yield call(checkToken, token);
		//console.log('respoonse: ' + res.body)
		yield put({
			type: 'TOKEN_CHECKED',
			payload: {
				email: userInfo.email,
				role: userInfo.role,
				avatar: userInfo.avatar
			}
		})
	}
	catch (err) {
		localStorage.removeItem('token');
		yield put({ type: 'TOKEN_NOT_CHECKED' })
	}
};

export function* handleLogout(action) {
	try {
		yield localStorage.removeItem('token');
		yield put({
			type: 'LOGOUT'
		})
	}
	catch (err) { }
}

export function* RequestLogin(action) {
	try {
	}
	catch (err) {
		localStorage.removeItem('token');
		yield put({ type: 'TOKEN_NOT_CHECKED' })
	}
};

export function* CreateNewEmployee(action) {
	try {
		const response = yield call(signUp(action.data))
		yield put({ type: 'EMPLOYEE_CREATED', payload: response })
	}
	catch (err) {
		yield put({ type: 'EMPLOYEE_NOT_CREATE', payload: err })
	}
}

export function* RequestForgotPassword(action){
	try{
		const response = yield call(requestForgotPassword, action.payload);
		yield NotificationManager.success('Đã gửi yêu cầu đặt lại mật khẩu, vui lòng kiểm tra email', 'Success', 3000);
		yield put({type: 'HIDE_FORGOT_PASSWORD_FORM'})
	}
	catch(err){}
}

export function* RequestSetNewPassword(action){
	try{
		const response = yield call (requestSetNewPassword, action.payload.email, action.payload.newPassword, action.payload.token)
		console.log(action.payload)
		yield NotificationManager.success('Đã đặt lại mật khẩu', 'Success', 3000);
	}
	catch(err){
		yield NotificationManager.error('Lỗi khi đặt lại mật khẩu', 'Lỗi', 3000);
	}
}
