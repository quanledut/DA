import {fork,takeLatest,takeEvery, all} from 'redux-saga/effects';
import {LoadUser, handleLogout, CreateNewEmployee, RequestForgotPassword, RequestSetNewPassword} from './User';
import {LoadDepartment, RequestNewProduct, LoadProduct} from './Product';
import {handleRouteScreen} from './RouteScreen';


function* rootSaga(){
    yield all ([
        yield fork(LoadUser),
        yield fork(LoadDepartment),
        yield fork(LoadProduct,{}),
        yield takeLatest('HANDLE_LOGOUT', handleLogout),
        yield takeLatest('SCREEN_ROUTER', handleRouteScreen),
        yield takeLatest('CREATE_NEW_EMPLOYEE', CreateNewEmployee),
        yield takeLatest('SEND_REQUEST_FORGOT_PASSWORD', RequestForgotPassword ),
        yield takeLatest('REQUEST_SET_NEW_PASSWORD', RequestSetNewPassword ),
        //yield takeLatest('HANDLE_CHANGE_DEPARTMENT', RequestNewProduct),
        yield takeLatest('REQUEST_CREATE_NEW_PRODUCT', RequestNewProduct),
        yield takeLatest('LOAD_ALL_PRODUCT', LoadProduct)
    ])
}

export default rootSaga;