import { call, put, } from 'redux-saga/effects';
import { checkToken, signUp , requestForgotPassword, requestSetNewPassword, login} from '../../api/AccountApi';
import {NotificationManager} from 'react-notifications'

export function* LoadUser() {
		let token = yield localStorage.getItem('token');
		if(token) yield put({type: 'LOGIN_SUCCESS',payload: token})
};

export function* RequestLogin(action){
	try{
		let token = yield call(login, action.payload);
		if(action.payload.remember) localStorage.setItem('token', token);
		NotificationManager.success('Đăng nhập thành công','Success',2000);
		yield put({type: 'LOGIN_SUCCESS', payload: token})
	}
	catch(err){
		NotificationManager.error('Đăng nhập thất bại','Error',2000);
		yield put({type: 'LOGIN_FAILED', payload: err})
	}
}

export function* handleLogout(action) {
	try {
		yield localStorage.removeItem('token');
		yield put({
			type: 'LOGOUT'
		})
	}
	catch (err) { }
}

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
		yield NotificationManager.success('Đã đặt lại mật khẩu', 'Success', 3000);
	}
	catch(err){
		yield NotificationManager.error('Lỗi khi đặt lại mật khẩu', 'Lỗi', 3000);
	}
}

export function* LoadUserFromToken(action){
	try {
		const userInfo = yield call(checkToken, action.payload);
		yield put({
			type: 'TOKEN_CHECKED',
			payload: {
				email: userInfo.email,
				role: userInfo.role,
				avatar: userInfo.avatar,
				user_id: userInfo.user_id
			}
		})
	}
	catch (err) {
		localStorage.removeItem('token');
		yield put({ type: 'TOKEN_NOT_CHECKED' })
	}
}
