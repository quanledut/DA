import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import './App.css';
import LoginDialog from './components/LoginDialog';
import Viewer from './containers/layouts/Viewer';
import Header from './containers/layouts/Header';
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
	render() {
		return (
			<Provider store={store}>
			{/* <div style = {{width: '100vw', height: '100vh'}}> */}
				<Header />
				<Viewer />
			{/* </div> */}
			</Provider>
		);
	}
}
export default App;
