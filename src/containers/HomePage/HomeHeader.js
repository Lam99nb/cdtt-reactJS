import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import Login from '../Auth/Login';
import logo from '../../../src/assets/images/logoSam.png';
import About from './About/About';

import './HomeHeader.scss';
class HomeHeader extends Component {
	render() {
		const { userInfo } = this.props;
		console.log(userInfo);
		return (
			<div>
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
									<i className="fas fa-search icon" />
									<div className="search-input">
										<div className="input-group  mb-3">
											<input type="text" className="form-control" placeholder="Tìm kiếm ..." />
											<div className="">
												<button className="btn btn-dark" type="button">
													<i className="fas fa-search" style={{ fontSize: '12px' }} />
												</button>
											</div>
										</div>
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
									<i className="fas fa-shopping-bag" />
									<Link to="/cart">
										<div className="sub">Giỏ hàng</div>
									</Link>
								</div>
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
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
