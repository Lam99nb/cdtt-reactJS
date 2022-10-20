import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import './HomeHeader.scss';
class HomeHeader extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="home-header-container">
					<div className="home-header-content">
						<div className="left-content">
							<div className="header-logo" />
						</div>
						<div className="center-content">
							<div className="child-content">
								<div class="dropdown">
									<button
										class="btn sub-title dropdown-toggle"
										type="button"
										id="dropdownMenu2"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										Sản phẩm
									</button>
									<div class="dropdown-menu" aria-labelledby="dropdownMenu2">
										<button class="dropdown-item" type="button">
											Quần short
										</button>
										<button class="dropdown-item" type="button">
											Đầm
										</button>
										<button class="dropdown-item" type="button">
											Áo sơ mi
										</button>
									</div>
								</div>
							</div>
							<div className="btn child-content">
								<div className="sub-title">Sản phẩm mới</div>
							</div>
							<div className="child-content">
								<div className="sub-title">NEM Online</div>
							</div>
							<div className="child-content">
								<div className="sub-title">Sales</div>
							</div>
						</div>
						<div className="right-content">
							<div className="child-content-right">
								<div className="search">
									<i className="fas fa-search" />
								</div>
								<div className="user">
									<i className="fas fa-user" />
									Tài khoản
								</div>
								<div className="cart">
									<i className="fas fa-shopping-bag" />
									<div className="sub">Giỏ hàng</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="home-header-banner">
					<div className="banner-text">Trang chu</div>
					<div className="banner-img" />
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
