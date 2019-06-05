import { Route, Router, Redirect, Switch } from 'react-router-dom';
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
import {BarChart} from '../components/Chart';
import GoogleMap from '../components/GoogleMap';
import Loading from '../components/Loading';
import Report from './Report';
import Page404 from './Page404'
import {connect} from 'react-redux';
import Sales from './Sales';
import ImportStock from './ImportStock';

export class ScreenRouter extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const {role} = this.props;
        return (
            <div style = {{width:'100%', height:'100%'}}>
            {
                {
                   'admin': 
                        <Router history = {history} style = {{width:'100%', height:'100%'}}>
                            <Switch>
                                <Route exact path='/' component={Products} />
                                <Route exact path='/products/:id?' component={ProductDetail} />
                                <Route exact path='/about' component={About} />
                                <Route exact path = '/reset/:token' component = {ForgotPassword}/>
                                <Route exact path='/product/new' component={NewProduct} />
                                <Route exact path = '/cards' component = {NewSaleOrder} />
                                <Route exact path = '/pdf' component = {InvoicePdf} />
                                <Route exact path = '/saleorder/customer' component = {SaleOrder_ChooseCustomer} />
                                <Route exact path = '/saleorder/payment' component = {Payment} />
                                <Route exact path = '/saleorder/info' component = {SaleOrderInfo} />
                                <Route exact path = '/saleorder/success' component = {SaleOrderSuccess} />
                                <Route exact path = '/saleorders/:id' component={SaleOrderDetail} />
                                <Route exact path = '/saleorders' component = {SaleOrders} />
                                <Route exact path = '/customers' component = {Customers} />
                                <Route exact path = '/customers/:id' component = {CustomerDetail} />
                                <Route exact path = '/users/detail' component = {SelfInfo} />
                                <Route exact path = '/employees' component = {Employees} />
                                <Route exact path = '/employees/:id' component = {EmployeeDetail} />
                                <Route exact path = '/chart' component = {BarChart} />
                                <Route exact path = '/report' component = {Report} />
                                <Route exact path = '/map' component = {GoogleMap} />
                                <Route exact path = '/loading' component = {Loading} />
                                <Route exact path = '/sales' component = {Sales} />
                                <Route exact path = '/import' component = {ImportStock}/>
                                <Route component={Page404} />
                            </Switch>
                        </Router>,
                    'manager': 
                        <Router history = {history} style = {{width:'100%', height:'100%'}}>
                            <Switch>
                                <Route exact path='/' component={Products} />
                                <Route exact path='/products/:id?' component={ProductDetail} />
                                <Route exact path='/about' component={About} />
                                <Route exact path = '/reset/:token' component = {ForgotPassword}/>
                                <Route exact path='/product/new' component={NewProduct} />
                                <Route exact path = '/cards' component = {NewSaleOrder} />
                                <Route exact path = '/pdf' component = {InvoicePdf} />
                                <Route exact path = '/saleorder/customer' component = {SaleOrder_ChooseCustomer} />
                                <Route exact path = '/saleorder/payment' component = {Payment} />
                                <Route exact path = '/saleorder/info' component = {SaleOrderInfo} />
                                <Route exact path = '/saleorder/success' component = {SaleOrderSuccess} />
                                <Route exact path = '/saleorders/:id' component={SaleOrderDetail} />
                                <Route exact path = '/saleorders' component = {SaleOrders} />
                                <Route exact path = '/customers' component = {Customers} />
                                <Route exact path = '/customers/:id' component = {CustomerDetail} />
                                <Route exact path = '/users/detail' component = {SelfInfo} />
                                <Route exact path = '/employees' component = {Employees} />
                                <Route exact path = '/employees/:id' component = {EmployeeDetail} />
                                <Route exact path = '/map' component = {GoogleMap} />
                                <Route exact path = '/sales' component = {Sales} />
                                <Route exact path = '/loading' component = {Loading} />
                                <Route component={Page404} />
                            </Switch>
                        </Router>,
                    'seller': 
                        <Router history = {history} style = {{width:'100%', height:'100%'}}>
                            <Switch>
                                <Route exact path='/' component={Products} />
                                <Route exact path='/products/:id?' component={ProductDetail} />
                                <Route exact path='/about' component={About} />
                                <Route exact path = '/reset/:token' component = {ForgotPassword}/>
                                <Route exact path = '/cards' component = {NewSaleOrder} />
                                <Route exact path = '/saleorder/customer' component = {SaleOrder_ChooseCustomer} />
                                <Route exact path = '/saleorder/payment' component = {Payment} />
                                <Route exact path = '/saleorder/info' component = {SaleOrderInfo} />
                                <Route exact path = '/saleorder/success' component = {SaleOrderSuccess} />
                                <Route exact path = '/saleorders/:id' component={SaleOrderDetail} />
                                <Route exact path = '/saleorders' component = {SaleOrders} />
                                <Route exact path = '/customers' component = {Customers} />
                                <Route exact path = '/customers/:id' component = {CustomerDetail} />
                                <Route exact path = '/users/detail' component = {SelfInfo} />
                                <Route exact path = '/sales' component = {Sales} />
                                <Route component={Page404} />
                            </Switch>
                        </Router>,
                    'guess':
                        <Router history = {history} style = {{width:'100%', height:'100%'}}>
                            <Switch>
                                <Route exact path='/' component={Products} />
                                <Route exact path='/products/:id?' component={ProductDetail} />
                                <Route exact path='/about' component={About} />
                                <Route exact path = '/404' component={Page404} />
                                <Route exact path = '/cards' component = {NewSaleOrder} />
                                <Route exact path = '/sales' component = {Sales} />
                                <Route exact path = '/saleorders/:id' component={SaleOrderDetail} />
                                <Route component={Page404} />
                            </Switch>
                        </Router>,
                    null:
                        <Router history = {history} style = {{width:'100%', height:'100%'}}>
                            <Route path='/' component={Loading} />
                        </Router>,
                }
                [role]
            }
            </div>          
        )
    }
}

const mapState2Props = (state) => {
    return {
        role: state.LoginReducer.role
    }
}

const mapDispatch2Props = (dispatch) => {
    return {

    }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(ScreenRouter))
