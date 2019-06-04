import history from '../../history';
import {put, call, all, takeLatest} from 'redux-saga/effects';
//import {Redirect} from 'react-router-dom'
export function* handleRouteScreen(action) {
    try {
        switch (action.payload){
            case '/':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:{screen: 'products'}})
                //return (<Redirect to = '/products'/>)
                yield call(history.push,'/');
                break;
            }
            case 'products':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:{screen: 'products'}})
                //return (<Redirect to = '/products'/>)
                yield call(history.push,'/');
                break;
            }
            case '/saleorders':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:{screen: 'saleorders'}})
                //return (<Redirect to = '/employees'/>)
                yield call(history.push,'/saleorders');
                break;
            }
            case 'saleorders':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:{screen: 'saleorders'}})
                //return (<Redirect to = '/employees'/>)
                yield call(history.push,'/saleorders');
                break;
            }
            case 'about':{
                yield put({type: 'ROUTE_SCREEN_BY_REDUX_SAGA', payload:{screen: 'about'}})
                //return (<Redirect to = '/about'/>)
                yield call(history.push,'/about');
                break;
            }
            default:{
                yield call(history.push,action.payload)
            }
        }
        
    }
    catch(err){}
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

export function* PageSaga(){
    yield all([
        yield takeLatest('HANDLE_LOGOUT', handleLogout),
        yield takeLatest('SCREEN_ROUTER', handleRouteScreen)
    ])
}

