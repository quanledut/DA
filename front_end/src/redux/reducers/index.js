import {combineReducers} from 'redux';
import {LoginReducer} from './LoginReducer';
import PageReducer from './PageReducer';
import ProductReducer from './ProductReducer';
import CustomerReducer from './CustomerReducer';
import SaleOrderReducer from './SaleOrderReducer'
import UserReducer from './UserReducer';
import EmployeeReducer from './EmployeeReducer';
import ReportReducer from './ReportReducer'
import SaleReducer from './SaleReducer'

export default combineReducers({
    LoginReducer,
    PageReducer, 
    ProductReducer,
    CustomerReducer,
    SaleOrderReducer,
    UserReducer,
    EmployeeReducer,
    ReportReducer,
    SaleReducer
});