import {combineReducers} from 'redux';
import {LoginReducer} from './LoginReducer';
import PageReducer from './PageReducer';
import ProductReducer from './ProductReducer';
import CustomerReducer from './CustomerReducer';
import SaleOrderReducer from './SaleOrderReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    LoginReducer,
    PageReducer, 
    ProductReducer,
    CustomerReducer,
    SaleOrderReducer,
    UserReducer
});