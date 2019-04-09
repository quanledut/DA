import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './containers/layouts/Header';
import ProductShow from './screens/ProductShow';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header/>
          <ProductShow/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
