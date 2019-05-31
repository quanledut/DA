import { call, put, } from 'redux-saga/effects';
import { checkToken, signUp , requestForgotPassword, requestSetNewPassword, login, updateUserDetail, 
	updateUserAvatar, loadEmployeeList, loadEmployeeDetail
	} from '../../api/AccountApi';
import {NotificationManager} from 'react-notifications';
import {numberOfEmployeePerPage, baseUrl} from '../../config'

export function* LoadUser() {
		let token = yield localStorage.getItem('token');
		if(token) yield put({type: 'LOGIN_SUCCESS',payload: token})
		else yield put({type: 'GUESS'})
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
		yield put({
			type: 'SCREEN_ROUTER', payload:'/'
		})
	}
	catch (err) { }
}

export function* CreateNewEmployee(action) {
	try {
		const response = yield call(signUp,action.token,action.payload)
		yield put({ type: 'EMPLOYEE_CREATED', payload: response })
		yield put({ type: 'LOAD_EMPLOYEE_LIST',token:action.token, payload: {page:1, limit:numberOfEmployeePerPage, role:'',search_text:''} })
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
			payload: userInfo
		})
		yield put({
			type: 'SCREEN_ROUTER',
			payload: window.location.href.split(baseUrl)[1]
		})
	}
	catch (err) {
		localStorage.removeItem('token');
		yield put({ type: 'TOKEN_NOT_CHECKED' })
	}
}

export function* UpdateUserDetail(action){
	try{
		yield call(updateUserDetail,action.token, action.payload);
		NotificationManager.success('Success', 'Success', 2000)
		yield put({type: 'LOGIN_SUCCESS', payload: action.token});
		yield put({type: 'UPDATE_USER_DETAIL_SUCCESSED'})
	}
	catch(err){
		yield put({type: 'UPDATE_USER_DETAIL_FAILED', payload: err})
		//yield put({type: 'LOGIN_SUCCESS', payload: action.token});
	}
}

export function* UpdateUserAvatar(action){
	try{
		let UserDetail = yield call(updateUserAvatar,action.token, action.payload);
		yield put({type: 'UPDATE_USER_AVATAR_SUCCESSED', payload: UserDetail})
		yield put({type: 'LOGIN_SUCCESS', payload: action.token})
	}
	catch(err){
		yield put({type: 'UPDATE_USER_AVATAR_FAILED'})
	}
}

export function* LoadEmployeeList(action){
	try{
		let employees = yield call(loadEmployeeList,action.token, action.payload);
		yield put({type: 'LOAD_EMPLOYEE_LIST_SUCCESS', payload: employees})
		//yield put({type: 'LOGIN_SUCCESS', payload: action.token})
	}
	catch(err){
		yield put({type: 'LOAD_EMPLOYEE_LIST_FAILED'})
	}
}

export function* ShowEmployeeDetail(action){
	try{
		let employee = yield call(loadEmployeeDetail,action.token, action.payload);
		yield put({type: 'LOAD_EMPLOYEE_DETAIL_SUCESS', payload: employee})
		yield put({type: 'SCREEN_ROUTER', payload: `/employees/${action.payload}`})
	}
	catch(err){
		yield put({type: 'LOAD_EMPLOYEE_DETAIL_FAILED'})
	}
}



