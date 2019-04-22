import {combineReducers} from 'redux';
import {LoginReducer} from './LoginReducer';
import PageReducer from './PageReducer'

export default combineReducers({
    LoginReducer,
    PageReducer
});