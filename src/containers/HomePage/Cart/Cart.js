import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './Cart.scss';
import image_cart from '../../../assets/images/somihoanhithietkeSM12982.jpg';
import image_cart2 from '../../../assets/images/CHÂN VÁY HỌA TIẾT Z08832.webp';
import { KEY_PRODUCT_CART } from '../../../utils/constant';

import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: {
				'id1': 0
			},
			listProduct: [],
			moneyTotal: 0
		};
	}

	incrementCount = (id) => {
		this.setState(preState => {
			let count = Object.assign({}, preState.count);
			count[id]++;
			this.changeLocalStorege(id, count[id]);
			return { count };
		}, () => {
			this.updateTotalMoney();
		});
	};

	decrementCount = (id) => {
		this.setState(preState => {
			let count = Object.assign({}, preState.count);
			count[id] = count[id] > 1 ? count[id] - 1 : 1;
			this.changeLocalStorege(id, count[id]);
			return { count };
		}, () => {
			this.updateTotalMoney();
		});
	};

	changeLocalStorege = (id, amount) => {
		let listProduct = JSON.parse(localStorage.getItem(KEY_PRODUCT_CART) ?? '[]');
		listProduct = listProduct.map(x => {
			if (x.id === id) {
				x.amount = amount;
			}

			return x;
		});

		localStorage.setItem(KEY_PRODUCT_CART, JSON.stringify(listProduct));
	}

	updateTotalMoney = () => {
		let listProduct = JSON.parse(localStorage.getItem(KEY_PRODUCT_CART) ?? '[]');
		this.setState({ listProduct }, () => {
			let moneyTotal = this.state.listProduct.reduce((pre, cur) => pre + cur.amount * cur.price, 0);
			this.setState({ moneyTotal: moneyTotal });
		});
	}

	async componentDidMount() {
		let listProduct = JSON.parse(localStorage.getItem(KEY_PRODUCT_CART) ?? '[]');

		this.setState({ listProduct }, () => {
			this.updateTotalMoney();
			let count = {};
			this.state.listProduct.map(x => {
				count[x.id] = x.amount;
			})

			this.setState({ count });
		});
	}

	render() {
		return (
			<React.Fragment>
				<HomeHeader />
				<div className="container cart-container">
					<h1>GIỎ HÀNG </h1>
					<div className=" ">
						<div className="">
							<table id="product-table">
								<tr>
									<th />
									<th>Sản phẩm</th>
									<th>Số lượng</th>
									<th>Giá</th>
								</tr>
								{
									this.state.listProduct.map(x => {
										return (
											<tr>
												<td class="image-product-cart">
													<img class="image-product" src={x.image} />
												</td>

												<td>
													<p>Váy hoa thiết kế</p>
													<div className="delete-btn">
														Phiên bản: {x.size} / {x.color}<br />
														Xoá
													</div>
												</td>
												<td>
													<div className="select-qty">
														<div>
															<button onClick={() => this.decrementCount(x.id)} type="button">
																-
															</button>
														</div>

														<div className="number">{this.state.count[x.id]}</div>
														<div>
															<button onClick={() => this.incrementCount(x.id)} type="button">
																+
															</button>
														</div>
													</div>{' '}
												</td>
												<td>{(x.price * this.state.count[x.id]).toLocaleString('en-US', {
													style: 'currency',
													currency: 'VND',
												})}</td>
											</tr>
										)
									})
								}

								{/* <tr>
									<td class="image-product-cart">
										<img class="image-product" src={image_cart2} />
									</td>

									<td>
										<p>Đầm hoa nhí</p>
										<div className="delete-btn">
											Phiên bản: Size M / Trắng <br />
											Thương hiệu SAM <br /> Xoá
										</div>
									</td>
									<td>
										<div className="select-qty">
											<div>
												<button onClick={() => this.decrementCount()} type="button">
													-
												</button>
											</div>

											<div className="number">{count}</div>
											<div>
												<button onClick={() => this.incrementCount()} type="button">
													+
												</button>
											</div>
										</div>{' '}
									</td>
									<td>970.000₫</td>
								</tr> */}
							</table>
						</div>
						<div className="cart-row">
							<div class="cart-note">
								<label>Chú thích</label>
								<textarea style={{ width: '100%', height: '102px' }} />
							</div>
							<div className="btn-cart">
								<p style={{ textAlign: 'right' }}>
									<span>Tổng tiền </span>
									<span className="cart-price">{
										(this.state.moneyTotal).toLocaleString('en-US', {
											style: 'currency',
											currency: 'VND',
										})
									}</span>
								</p>
								<button type="button" class="btn  btn-update">
									Cập nhật
								</button>
								<button type="button" class="btn  btn-pay">
									Thanh toán
								</button>
							</div>
						</div>
					</div>
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
