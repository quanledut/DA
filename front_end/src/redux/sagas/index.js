import {fork,takeLatest,takeEvery, all} from 'redux-saga/effects';
import {LoadUser, handleLogout, CreateNewEmployee, RequestForgotPassword, RequestSetNewPassword} from './User';
import {LoadDepartment, RequestNewProduct, LoadProduct, ShowProductDetail} from './Product';
import {handleRouteScreen} from './RouteScreen';
import {numberOfProductPerPage} from '../../config'

function* rootSaga(){
    yield all ([
        //user
        yield fork(LoadUser),
        yield takeLatest('CREATE_NEW_EMPLOYEE', CreateNewEmployee),
        yield takeLatest('SEND_REQUEST_FORGOT_PASSWORD', RequestForgotPassword ),
        yield takeLatest('REQUEST_SET_NEW_PASSWORD', RequestSetNewPassword ),
        
        //product
        yield fork(ShowProductDetail, {payload:'5cd3dab16837282324c40d98'}),
        yield fork(LoadDepartment),
        yield fork(LoadProduct,{payload:{limit: numberOfProductPerPage, page:1}}),
        yield takeLatest('GET_PRODUCT', LoadProduct),
        yield takeLatest('REQUEST_CREATE_NEW_PRODUCT', RequestNewProduct),
        yield takeLatest('LOAD_ALL_PRODUCT', LoadProduct),
        yield takeLatest('HANDLE_SHOW_PRODUCT_DETAIL', ShowProductDetail),

        //page
        yield takeLatest('HANDLE_LOGOUT', handleLogout),
        yield takeLatest('SCREEN_ROUTER', handleRouteScreen),
    ])
}

export default rootSaga;