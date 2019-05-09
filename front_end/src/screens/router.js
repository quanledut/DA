import { Route, Router } from 'react-router-dom';
import Products from '../screens/Products';
import ProductDetail from '../screens/ProductDetail';
import { About } from '../screens/About';
import { Employees } from '../screens/Employees';
import { withRouter } from 'react-router-dom';
import history from '../history';
import ForgotPassword from './ForgotPassword';
import NewProduct from './NewProduct';

import React, { Component } from 'react'

export class ScreenRouter extends Component {
    render() {
        return (
            <Router history = {history} >
                <Route exact path='/' component={Products} />
                <Route exact path='/products/:id?' component={ProductDetail} />
                <Route exact path='/about' component={About} />
                <Route exact path='/employees' component={Employees} />
                <Route path = '/reset/:token?' component = {ForgotPassword}/>
                <Route path='/product/new' component={NewProduct} />
            </Router>
        )
    }
}

export default withRouter(ScreenRouter)
