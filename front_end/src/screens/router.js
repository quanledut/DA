import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import ProductShow from '../screens/ProductShow';
import {About} from './About';
import Test from './Test'

const ScreenRouter = () => (
    <Router>
        <Route exact path = '/' component = {ProductShow} />
        <Route path = '/about' component = {About} />  
        <Route path = '/test' component = {Test}/>
    </Router>
)

export default ScreenRouter;