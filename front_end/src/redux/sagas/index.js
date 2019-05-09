import {fork,takeLatest,takeEvery, all} from 'redux-saga/effects';
import {LoadUser, handleLogout, CreateNewEmployee, RequestForgotPassword, RequestSetNewPassword} from './User';
import {LoadDepartment, RequestNewProduct, LoadProduct} from './Product';
import {handleRouteScreen} from './RouteScreen';


function* rootSaga(){
    yield all ([
        //user
        yield fork(LoadUser),
        yield takeLatest('CREATE_NEW_EMPLOYEE', CreateNewEmployee),
        yield takeLatest('SEND_REQUEST_FORGOT_PASSWORD', RequestForgotPassword ),
        yield takeLatest('REQUEST_SET_NEW_PASSWORD', RequestSetNewPassword ),
        
        //product
        yield fork(LoadDepartment),
        yield fork(LoadProduct,{payload:{limit: 20, page:1}}),
        yield takeLatest('GET_PRODUCT', LoadProduct),
        yield takeLatest('REQUEST_CREATE_NEW_PRODUCT', RequestNewProduct),
        yield takeLatest('LOAD_ALL_PRODUCT', LoadProduct),

        //page
        yield takeLatest('HANDLE_LOGOUT', handleLogout),
        yield takeLatest('SCREEN_ROUTER', handleRouteScreen),
    ])
}

export default rootSaga;