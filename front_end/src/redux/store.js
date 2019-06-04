import {createStore, compose, applyMiddleware} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import  rootSaga from './sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware ();
const store = createStore(reducers,composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
