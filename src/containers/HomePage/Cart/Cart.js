import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './Cart.scss';
import image_cart from '../../../assets/images/somihoanhithietkeSM12982.jpg';
import image_cart2 from '../../../assets/images/CHÂN VÁY HỌA TIẾT Z08832.webp';

import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1
		};
	}
	incrementCount = () => {
		let count = this.state.count;
		this.setState({
			count: count + 1
		});
	};

	decrementCount = () => {
		let count = this.state.count;
		this.setState({
			count: count - 1
		});
	};
	render() {
		let count = this.state.count;
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
								<tr>
									<td class="image-product-cart">
										<img class="image-product" src={image_cart} />
									</td>

									<td>
										<p>Váy hoa thiết kế</p>
										<div className="delete-btn">
											Phiên bản: Size M / Xanh <br />Thương hiệu SAM <br />Xoá
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
									<td>850.000₫</td>
								</tr>
								<tr>
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
								</tr>
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
									<span className="cart-price">1.200.000₫</span>
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
