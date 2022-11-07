import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import './Product.scss';
class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrProducts: ''
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.topProductRedux !== this.props.topProductRedux) {
			this.setState({
				arrProducts: this.props.topProductRedux
			});
		}
	}

	componentDidMount() {
		this.props.loadTopProducts();
	}
	handleViewDetailProduct = (product) => {
		if (this.props.history) {
			this.props.history.push(`/detail-product/${product.id}`);
		}
	};
	render() {
		let arrProducts = this.state.arrProducts;

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
					{arrProducts &&
						arrProducts.length > 0 &&
						arrProducts.map((item, index) => {
							let imageBase64 = '';
							if (item.image) {
								imageBase64 = new Buffer(item.image, 'base64').toString('binary');
							}
							return (
								<div
									className="product-item col-3 "
									data-aos="zoom-in"
									key={index}
									onClick={() => this.handleViewDetailProduct(item)}
								>
									<div className="card ">
										<div
											className="card-img-top product-img"
											alt="Card image cap"
											style={{ backgroundImage: `url(${imageBase64})` }}
										/>
										<div className="card-body">
											<h5 className="item-title">{item.productName}</h5>
											<p className="item-price">
												{item.price}
												<span>₫</span>
											</p>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		topProductRedux: state.product.topProduct
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTopProducts: () => dispatch(actions.fetchTopProduct())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
