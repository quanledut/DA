import {combineReducers} from 'redux';
import {LoginReducer} from './LoginReducer';
import PageReducer from './PageReducer';
import ProductReducer from './ProductReducer'

export default combineReducers({
    LoginReducer,
    PageReducer, 
    ProductReducer
});