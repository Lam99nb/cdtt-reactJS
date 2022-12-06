import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import Login from '../Auth/Login';
import logo from '../../../src/assets/images/logoSam.png';
import About from './About/About';

import './HomeHeader.scss';
class HomeHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataInput: '',
			listProductSearchResults: []
		};
	}

	handleSearchProduct = (event) => {
		let valueInput = event.target.value;

		this.setState({
			dataInput: valueInput
		});
	};

	searchProduct = (searchInput) => {
		this.props.loadResultsProducts(this.state.dataInput);

		searchInput = this.state.dataInput;
		if (this.props.history) {
			this.props.history.push(`/search/${searchInput}`);
		}
		console.log('check home header', this.state.dataInput);
	};

	render() {
		const { userInfo } = this.props;

		return (
			<div className="home-header-container">
				<div className="home-header-content">
					<div className="left-content">
						<Link to="/home">
							<div className="header-logo">
								<img src={logo} />
							</div>
						</Link>
					</div>
					<div className="center-content">
						<div className="child-content">
							<div className="dropdown">
								<button
									className="btn sub-title dropdown-toggle"
									type="button"
									id="dropdownMenu2"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Sản phẩm
								</button>
								<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
									<button className="dropdown-item" type="button">
										Quần short
									</button>
									<button className="dropdown-item" type="button">
										Đầm
									</button>
									<button className="dropdown-item" type="button">
										Áo sơ mi
									</button>
								</div>
							</div>
						</div>
						<div className="btn child-content">
							<div className="sub-title">Sản phẩm mới</div>
						</div>
						<div className="child-content">
							<div className="sub-title">Sales</div>
						</div>
						<div className="child-content">
							<Link to="/about">
								<div className="sub-title">Giới thiệu</div>
							</Link>
						</div>
					</div>
					<div className="right-content">
						<div className="child-content-right">
							<div className="search">
								{/* // onClick={() => this.openSearch()} */}
								<div className="search-input">
									<nav class="navbar navbar-light bg-light justify-content-between">
										<form class="form-inline input-search input-group">
											<input
												class="form-control mr-sm-2"
												type="search"
												placeholder="Search"
												aria-label="Search"
												onChange={(event) => this.handleSearchProduct(event)}
											/>
											<button
												class="btn btn-outline-dark my-2 my-sm-0"
												type="button"
												onClick={() => this.searchProduct()}
											>
												Search
											</button>
										</form>
									</nav>
								</div>
							</div>
							<div className="user">
								<i className="fas fa-user" />
								{userInfo && userInfo.firstName ? (
									userInfo.lastName + ' ' + userInfo.firstName
								) : (
									<Link to="/api/login">Tài khoản</Link>
								)}
							</div>
							<div className="cart">
								<Link to="/cart">
									<i className="fas fa-shopping-bag" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadResultsProducts: (data) => dispatch(actions.fetchProductResults(data))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
