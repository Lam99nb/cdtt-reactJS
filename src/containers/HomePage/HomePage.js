import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import { path } from '../../utils';

import Product from './Section/Product';
import ChiTietSP from './ChiTietSP/ChiTietSP';

class HomePage extends Component {
	render() {
		const { isLoggedIn } = this.props;

		return (
			<BrowserRouter>
				<HomeHeader />
				<Product />
				<HomeFooter />
			</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
