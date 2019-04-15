import {createStore, compose, applyMiddleware} from 'redux';
import reducers from './reducers';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from './sagas'

const initialState = {};
const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(reducers, initialState, compose(
                                                        applyMiddleware(sagaMiddleWare),
                                                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
sagaMiddleWare.run(rootSaga);

export default store;