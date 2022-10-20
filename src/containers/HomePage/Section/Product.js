import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import './Product.scss';
class Product extends Component {
	render() {
		return (
			<div className="product-container">
				<div className="product-header row">
					<div className="product-header-text col-4">Tất cả sản phẩm</div>
					<div className="header-sort col-8">
						<div className="sort-size col-4">
							<div className="dropdown">
								<button
									className="btn dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Kích cỡ
								</button>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<button className="dropdown-item" href="#">
										Size 1
									</button>
									<button className="dropdown-item" href="#">
										Size 2
									</button>
									<button className="dropdown-item" href="#">
										Size 3
									</button>
									<button className="dropdown-item" href="#">
										free size
									</button>
								</div>
							</div>
						</div>
						<div className="sort-size col-4">
							<div className="dropdown">
								<button
									className="btn dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Màu sắc
								</button>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<button className="dropdown-item" href="#">
										Vàng
									</button>
									<button className="dropdown-item" href="#">
										Xanh
									</button>
									<button className="dropdown-item" href="#">
										Đỏ
									</button>
									<button className="dropdown-item" href="#">
										Trắng
									</button>
								</div>
							</div>
						</div>
						<div className="sort-size col-4">
							<div className="dropdown">
								<button
									className="btn dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Giá
								</button>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<button className="dropdown-item" href="#">
										Dưới 500.000
									</button>
									<button className="dropdown-item" href="#">
										Từ 500.000-700.000
									</button>
									<button className="dropdown-item" href="#">
										Từ 700.000-1.000.000
									</button>
									<button className="dropdown-item" href="#">
										Trên 1.000.000
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="product-content row">
					<div className="product-item col-3">
						<div className="card ">
							<div className="card-img-top product-img" alt="Card image cap" />
							<div className="card-body">
								<h5 className="item-title">Sơ mi hoa nhí thiết kế SM12982</h5>
								<p className="item-price">799.000 VND</p>
							</div>
						</div>
					</div>
					<div className="product-item col-3">
						<div className="card ">
							<div className="card-img-top product-img" alt="Card image cap" />
							<div className="card-body">
								<h5 className="item-title">Sơ mi hoa nhí thiết kế SM12982</h5>
								<p className="item-price">799.000 VND</p>
							</div>
						</div>
					</div>
					<div className="product-item col-3">
						<div className="card ">
							<div className="card-img-top product-img" alt="Card image cap" />
							<div className="card-body">
								<h5 className="item-title">Sơ mi hoa nhí thiết kế SM12982</h5>
								<p className="item-price">799.000 VND</p>
							</div>
						</div>
					</div>
					<div className="product-item col-3">
						<div className="card ">
							<div className="card-img-top product-img" alt="Card image cap" />
							<div className="card-body">
								<h5 className="item-title">Sơ mi hoa nhí thiết kế SM12982</h5>
								<p className="item-price">799.000 VND</p>
							</div>
						</div>
					</div>
					<div className="product-item col-3">
						<div className="card ">
							<div className="card-img-top product-img" alt="Card image cap" />
							<div className="card-body">
								<h5 className="item-title">Sơ mi hoa nhí thiết kế SM12982</h5>
								<p className="item-price">799.000 VND</p>
							</div>
						</div>
					</div>
					<div className="product-item col-3">
						<div className="card ">
							<div className="card-img-top product-img" alt="Card image cap" />
							<div className="card-body">
								<h5 className="item-title">Sơ mi hoa nhí thiết kế SM12982</h5>
								<p className="item-price">799.000 VND</p>
							</div>
						</div>
					</div>
					<div className="product-item col-3">
						<div className="card ">
							<div className="card-img-top product-img" alt="Card image cap" />
							<div className="card-body">
								<h5 className="item-title">Sơ mi hoa nhí thiết kế SM12982</h5>
								<p className="item-price">799.000 VND</p>
							</div>
						</div>
					</div>
					<div className="product-item col-3">
						<div className="card ">
							<div className="card-img-top product-img" alt="Card image cap" />
							<div className="card-body">
								<h5 className="item-title">Sơ mi hoa nhí thiết kế SM12982</h5>
								<p className="item-price">799.000 VND</p>
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
		isLoggedIn: state.user.isLoggedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
