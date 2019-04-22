import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import './App.css';
import LoginDialog from './components/LoginDialog';
import Viewer from './containers/layouts/Viewer';
import Header from './containers/layouts/Header';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Header />
				<Viewer />
				<LoginDialog />
			</Provider>
		);
	}
}


export default App;
