import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
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
					{/* luu lai lich su tranh goi api nhieu lan */}
					<div className="main-container">
						{this.props.isLoggedIn && <Header />}
						{/* neu login thi hien ra header */}
						<span className="content-container">
							<Switch>
								<Route path={path.HOME} exact component={Home} />
								<Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
								<Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
								<Route path={path.HOMEPAGE} component={HomePage} />
							</Switch>
						</span>

						<ToastContainer
							className="toast-container"
							toastClassName="toast-item"
							bodyClassName="toast-item-body"
							autoClose={false}
							hideProgressBar={true}
							pauseOnHover={false}
							pauseOnFocusLoss={true}
							closeOnClick={false}
							draggable={false}
							closeButton={<CustomToastCloseButton />}
						/>
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
