import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';

import Product from './Section/Product';
// import ChiTietSP from './ChiTietSP/ChiTietSP';

class HomePage extends Component {
	render() {
		return (
			<div>
				<HomeHeader />
				<Product />
				{/* <ChiTietSP /> */}
				<HomeFooter />
			</div>
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
