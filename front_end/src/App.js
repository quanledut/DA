import React, { Component } from 'react';
import Header from './containers/layouts/Header';
import ProductShow from './screens/ProductShow';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import store from './redux/store'
import './App.css';
import Router from './screens/router';
import LoginDialog from './components/LoginDialog';
import HeaderTop from './containers/layouts/HeaderTop'

class App extends Component {
  componentDidMount(){
    
  }
  render() {
    return (
      <Provider store = {store}>
        <MuiThemeProvider>
            <Header/>
            <Router/>
            <LoginDialog/>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
