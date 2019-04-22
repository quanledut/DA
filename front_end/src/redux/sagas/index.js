import {fork,takeLatest,takeEvery, all} from 'redux-saga/effects';
import {LoadUser} from './LoadUser'

function* rootSaga(){
    yield all ([
        yield fork(LoadUser)
    ])
    //yield takeEvery('DEMO',HelloSaga)
}

export default rootSaga;