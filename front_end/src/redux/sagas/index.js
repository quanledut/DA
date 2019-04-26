import {fork,takeLatest,takeEvery, all} from 'redux-saga/effects';
import {LoadUser, handleLogout} from './User';
import {LoadDepartment} from './Product';
import {handleRouteScreen} from './RouteScreen';


function* rootSaga(){
    yield all ([
        yield fork(LoadUser),
        yield fork(LoadDepartment),
        yield takeLatest('HANDLE_LOGOUT', handleLogout),
        yield takeLatest('SCREEN_ROUTER', handleRouteScreen)
    ])
}

export default rootSaga;