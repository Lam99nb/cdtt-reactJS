import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import { path } from '../../utils';

import Product from './Section/Product';
import Slider from './Slider/Slider';
import ChiTietSP from './ChiTietSP/ChiTietSP';

class HomePage extends Component {
	render() {
		const { isLoggedIn } = this.props;

		return (
			<React.Fragment>
				<HomeHeader />
				<Slider />
				<Product />
				<HomeFooter />
			</React.Fragment>
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
