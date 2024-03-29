import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { ConnectedRouter as Router } from 'connected-react-router';
import { Router } from 'react-router';

import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { path } from '../utils';

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import HomePage from './HomePage/HomePage';
import Order from './HomePage/Order/Order';
import About from './HomePage/About/About';
import Cart from './HomePage/Cart/Cart';

import ChiTietSP from './HomePage/ChiTietSP/ChiTietSP';

import { CustomToastCloseButton } from '../components/CustomToast';

// You can also pass an optional settings object
// below listed default settings
AOS.init();

class App extends Component {
	handlePersistorState = () => {
		const { persistor } = this.props;
		let { bootstrapped } = persistor.getState();
		if (bootstrapped) {
			if (this.props.onBeforeLift) {
				Promise.resolve(this.props.onBeforeLift())
					.then(() => this.setState({ bootstrapped: true }))
					.catch(() => this.setState({ bootstrapped: true }));
			} else {
				this.setState({ bootstrapped: true });
			}
		}
	};

	componentDidMount() {
		this.handlePersistorState();
	}

	render() {
		return (
			<Fragment>
				<Router history={history}>
					<div className="main-container">
						<span className="content-container">
							<Switch>
								<Route path={path.HOME} exact component={Home} />
								<Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
								<Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
								<Route path={path.HOMEPAGE} component={HomePage} />
								<Route path={path.DETAIL_PRODUCT} component={ChiTietSP} />
								<Route path={path.ORDER} component={Order} />
								<Route path={path.ABOUT} component={About} />
								<Route path={path.CART} component={Cart} />
							</Switch>
						</span>

						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="light"
						/>
						<ToastContainer />
					</div>
				</Router>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		started: state.app.started,
		isLoggedIn: state.user.isLoggedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
