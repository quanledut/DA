import {numberOfProductPerPage} from '../../config'
import {fork,takeLatest,takeEvery, all, put} from 'redux-saga/effects';
import { 
    LoadUser, handleLogout, CreateNewEmployee, LoadUserFromToken,
    RequestForgotPassword, RequestSetNewPassword, RequestLogin
    } from './User';
import {
    LoadDepartment, RequestNewProduct, LoadProduct, ChangeProductDetail,
    ShowProductDetail,AddProductToOrder
    } from './Product';
import {CleanSaleOrder, LoadSaleOrderLocal, LoadSaleOrderDetail, GoToNextStateSaleOrder,
        ReloadSaleOrder, UpdateSaleOrderItem, CreateNewSaleOrder, LoadSaleOrderList} from './SaleOrder'
import {
    handleRouteScreen
    } from './RouteScreen';
import {
    CreateNewCustomer,GetAllCustomers,GetCustomersList, GetCustomerDetail
    } from './Customer';


function* rootSaga(){
    yield all ([
        //user
        yield fork(LoadUser),
        yield takeLatest('REQUEST_LOGIN', RequestLogin),
        yield takeLatest('CREATE_NEW_EMPLOYEE', CreateNewEmployee),
        yield takeLatest('SEND_REQUEST_FORGOT_PASSWORD', RequestForgotPassword ),
        yield takeLatest('REQUEST_SET_NEW_PASSWORD', RequestSetNewPassword ),
        yield takeLatest('LOGIN_SUCCESS', LoadUserFromToken),
        
        //product
        //yield fork(CleanSaleOrder),
        yield fork(LoadDepartment),
        yield fork(LoadProduct,{payload:{limit: numberOfProductPerPage, page:1}}),
        yield takeLatest('CHANGE_PRODUCT_DETAIL',ChangeProductDetail),
        yield takeLatest('GET_PRODUCT', LoadProduct),
        yield takeLatest('REQUEST_CREATE_NEW_PRODUCT', RequestNewProduct),
        yield takeLatest('LOAD_ALL_PRODUCT', LoadProduct),
        yield takeLatest('HANDLE_SHOW_PRODUCT_DETAIL', ShowProductDetail),

        //sale_order
        yield fork(LoadSaleOrderLocal),
        yield takeLatest('RELOAD_SALE_ORDER', ReloadSaleOrder),
        yield takeLatest('UPDATE_SALE_ORDER_ITEM', UpdateSaleOrderItem),
        yield takeLatest('CREATE_NEW_SALE_ORDER', CreateNewSaleOrder),
        yield takeLatest('LOAD_SALE_ORDER_LIST', LoadSaleOrderList),
        yield takeLatest('SHOW_SALE_ORDER_DETAIL', LoadSaleOrderDetail),
        yield takeLatest('NEXT_STATE_SALE_ORDER', GoToNextStateSaleOrder),
        //customer
        yield takeLatest('CREATE_NEW_CUSTOMER', CreateNewCustomer),
        yield takeLatest('GET_ALL_CUSTOMERS', GetAllCustomers),
        yield takeLatest('LOAD_CUSTOMER_LIST', GetCustomersList),
        yield takeLatest('GET_CUSTOMER_DETAIL', GetCustomerDetail),
        //page
        yield takeLatest('HANDLE_LOGOUT', handleLogout),
        yield takeLatest('SCREEN_ROUTER', handleRouteScreen),
    ])
}

export default rootSaga;