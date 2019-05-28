import { Route, Router } from 'react-router-dom';
import Products from '../screens/Products';
import ProductDetail from '../screens/ProductDetail';
import { About } from '../screens/About';
import { withRouter } from 'react-router-dom';
import history from '../history';
import ForgotPassword from './ForgotPassword';
import NewProduct from './NewProduct';
import NewSaleOrder from './NewSaleOrder';
import InvoicePdf from './InvoicePdf';
import SaleOrder_ChooseCustomer from './SaleOrder_ChooseCustomer';
import Payment from './Payment';
import React, { Component } from 'react'
import SaleOrderInfo from './SaleOrderInfo';
import SaleOrderSuccess from './SaleOrderSuccess';
import SaleOrders from './SaleOrders';
import SaleOrderDetail from './SaleOrderDetail';
import Customers from './Customers';
import CustomerDetail from './CustomerDetail';
import SelfInfo from './SelfInfo';
import Employees from './Employees';
import EmployeeDetail from './EmployeeDetail';
import {BarChart} from '../components/Chart'
import Report from './Report'

export class ScreenRouter extends Component {
    render() {
        return (
            <Router history = {history} >
                <Route exact path='/' component={Products} />
                <Route exact path='/products/:id?' component={ProductDetail} />
                <Route exact path='/about' component={About} />
                <Route path = '/reset/:token?' component = {ForgotPassword}/>
                <Route path='/product/new' component={NewProduct} />
                <Route path = '/cards' component = {NewSaleOrder} />
                <Route path = '/pdf' component = {InvoicePdf} />
                <Route path = '/saleorder/customer' component = {SaleOrder_ChooseCustomer} />
                <Route path = '/saleorder/payment' component = {Payment} />
                <Route path = '/saleorder/info' component = {SaleOrderInfo} />
                <Route path = '/saleorder/success' component = {SaleOrderSuccess} />
                <Route exact path='/saleorders/:id' component={SaleOrderDetail} />
                <Route exact path = '/saleorders' component = {SaleOrders} />
                <Route exact path = '/customers' component = {Customers} />
                <Route exact path = '/customers/:id' component = {CustomerDetail} />
                <Route exact path = '/users/detail' component = {SelfInfo} />
                <Route exact path = '/employees' component = {Employees} />
                <Route exact path = '/employees/:id' component = {EmployeeDetail} />
                <Route exact path = '/chart' component = {BarChart} />
                <Route exact path = '/report' component = {Report} />
            </Router>
        )
    }
}

export default withRouter(ScreenRouter)
