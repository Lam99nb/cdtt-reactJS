import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { getDetailProduct } from '../../../services/productService';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import { Link, Route } from 'react-router-dom';
import Order from '../Order/Order';
import Comment from '../Comment/Comment';

import { KEY_PRODUCT_CART } from '../../../utils/constant';

import './ChiTietSP.scss';
import { HighQualityOutlined, QuickreplyTwoTone } from '@mui/icons-material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 984,
	bgcolor: 'background.paper',
	border: '1px solid #666',
	borderRadius: 5,
	boxShadow: 24,
	p: 4
};

class ChiTietSP extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			count: 1,
			detailProduct: {},
			sizeRadio: '',
			colorRadio: ''
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};
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
	async componentDidMount() {
		if (this.props.match && this.props.match.params && this.props.match.params.id) {
			let id = this.props.match.params.id;
			let res = await getDetailProduct(id);
			if (res && res.errCode === 0) {
				this.setState({
					detailProduct: res.data
				});
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.count !== this.state.count) {
			var setOrder = {
				image: this.state.detailProduct.image,
				productName: this.state.detailProduct.productName,
				quantity: this.state.count,
				price: this.state.detailProduct.price
			};
			localStorage.setItem('setOrder', JSON.stringify(setOrder));
		}
	}

	onChangeSizeRadio = (e) => {
		e.preventDefault();
		this.setState({
			sizeRadio: e.target.value
		});
	};
	onChangeColorRadio = (e) => {
		e.preventDefault();
		this.setState({
			colorRadio: e.target.value
		});
	};

	addProdutToCart = () => {
		const { detailProduct } = this.state;

		detailProduct.size = this.state.sizeRadio;
		detailProduct.color = this.state.colorRadio;
		detailProduct.amount = this.state.count;

		const productInCartString = localStorage.getItem(KEY_PRODUCT_CART);
		let productInCart = productInCartString ? JSON.parse(productInCartString) : [];

		let listItem = productInCart;
		if (productInCart && productInCart.find((x) => x.id === detailProduct.id)) {
			// san pham da co trong gio hang
			// => cap nhat thong tin moi
			productInCart = productInCart.map((x) => (x.id === detailProduct.id ? detailProduct : x));
			listItem = productInCart;
		} else {
			listItem.push(detailProduct);
		}
		localStorage.setItem(KEY_PRODUCT_CART, JSON.stringify(listItem));
		alert('Thêm vào giỏ hàng thành công!');
	};

	render() {
		let count = this.state.count;

		let { detailProduct } = this.state;
		// let currentURL = window.location.href;

		return (
			<React.Fragment>
				<HomeHeader />
				<div className="product container">
					<div className="row">
						<div
							className="product-img col-5"
							style={{
								backgroundImage: `url(${detailProduct && detailProduct.image
									? detailProduct.image
									: ''}) `
							}}
						/>
						<div className="product-content col-5">
							<div className="product-content-header">
								<div className="name-title">{detailProduct.productName}</div>
								<p>
									Thương hiệu: NEM <br /> Mã SP: 093821612223160418
								</p>
							</div>
							<div className="product-price">
								{detailProduct.price} <span>₫</span>
							</div>
							<form className="add-cart">
								<div className="pro-size">
									<div className="header">Kích thước:</div>
									<FormControl>
										{/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
											onChange={this.onChangeSizeRadio}
										>
											<FormControlLabel value="sizeS" control={<Radio />} label="Size S" />
											<FormControlLabel value="sizeM" control={<Radio />} label="Size M" />
											<FormControlLabel value="sizeL" control={<Radio />} label="Size L" />
											<FormControlLabel value="sizeXL" control={<Radio />} label="Size XL" />

											{/* <FormControlLabel value="disabled" disabled control={<Radio />} label="other" /> */}
										</RadioGroup>
									</FormControl>
								</div>
								<div className="pro-color">
									<div className="header">Màu sắc:</div>
									<FormControl>
										{/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
											onChange={this.onChangeColorRadio}
										>
											<FormControlLabel value="white" control={<Radio />} label="Trắng" />
											<FormControlLabel value="black" control={<Radio />} label="Đen" />
											<FormControlLabel value="pink" control={<Radio />} label="Hồng" />
											<FormControlLabel value="red" control={<Radio />} label="Đỏ" />

											{/* <FormControlLabel value="disabled" disabled control={<Radio />} label="other" /> */}
										</RadioGroup>
									</FormControl>
								</div>
								<div className="size-guide">
									<Button
										onClick={() => this.handleOpen()}
										sx={{
											color: '#000',
											textTransform: 'none',
											fontSize: 14,
											padding: 0,
											fontWeight: 'bold'
										}}
									>
										Hướng dẫn chọn size
									</Button>
									<Modal
										open={this.state.open}
										onClose={() => this.handleClose()}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box sx={style}>
											<div className="modal-background">
												<table id="pro-table">
													<tr>
														<th>SIZE </th>
														<th>S - 02</th>
														<th>M - 04</th>
														<th>L - 06</th>
														<th>XL - 08 </th>
													</tr>
													<tr>
														<th>Vai (cm)</th>
														<td>35</td>
														<td>36</td>
														<td>37</td>
														<td>38</td>
													</tr>
													<tr>
														<th>Ngực (cm)</th>
														<td>82</td>
														<td>86</td>
														<td>90</td>
														<td>94</td>
													</tr>
													<tr>
														<th>Eo (cm)</th>
														<td>66</td>
														<td>70</td>
														<td>75</td>
														<td>80</td>
													</tr>
													<tr>
														<th>Mông (cm)</th>
														<td>86</td>
														<td>90</td>
														<td>94</td>
														<td>98</td>
													</tr>
													<tr>
														<th>Cân nặng (cm)</th>
														<td>40 - 50</td>
														<td>51 - 55</td>
														<td>56 - 60</td>
														<td>61 - 64</td>
													</tr>
													<tr>
														<th>Chiều cao (cm)</th>
														<td>150 - 160</td>
														<td>155 - 160</td>
														<td>160 - 165</td>
														<td>165 - 170</td>
													</tr>
												</table>
											</div>
											<div className="footer-contact">
												<h5>Bạn vẫn còn có những mắc thắc và băn khoăn cần được giải đáp?</h5>
												<p>Hãy liên hệ ngay với bộ phận Bán hàng online của TNL </p>
												<p>039.535.4855</p>
												<br />
											</div>
										</Box>
									</Modal>
								</div>
								<div className="qty-addcart">
									<div className="header">Số lượng:</div>
									<div className="select-qty">
										<div>
											<button onClick={() => this.decrementCount()} type="button">
												-
											</button>
										</div>
										{/* thay bang input number */}
										<div className="number">{count}</div>
										<div>
											<button onClick={() => this.incrementCount()} type="button">
												+
											</button>
										</div>
									</div>
								</div>
								<div className="btn-group">
									<button className="add-cart-btn" type="button" onClick={this.addProdutToCart}>
										Thêm vào giỏ
									</button>
									<button
										className="buy-now-btn"
										// onClick={() => this.changeState()}
										type="button"
									>
										<Link to="/buy-now" style={{ decoration: 'none', color: '#fff' }}>
											Mua ngay
										</Link>
									</button>
								</div>
							</form>

							<div className="pro--short-desc">
								<div className="header">Chi tiết: </div>
								<p>
									Thiết kế chân váy lưới đen phóng khoáng, hiện đại, thanh lịch, thời thượng. Phần
									lưới xòe mềm mại, xếp ly nhỏ độc đáo. Trên nền chất liệu vải lưới chọn lọc cao cấp,
									sản phẩm mang lại cảm giác thoải mái cho người mặc. Có thể phối chân váy cùng áo sơ
									mi cùng màu, sơ mi trắng hay áo thun. Chân váy phù hợp diện đi làm, dạo phố cùng bạn
									bè, gia đình. Sản phẩm có thể kết hợp cùng áo sơ mi, áo thun và các phụ kiện đi kèm.<br />{' '}
									Dòng hàng: Chân váy <br /> Chất liệu: Vải lưới <br /> Màu sắc: Đen <br /> Kiểu dáng:
									Xòe <br /> Giặt và bảo quản: Nên giặt tay bằng nước lạnh, hạn chế giặt bằng nước
									nóng quá 40 độ C. Giặt riêng với các sản phẩm dễ phai màu. Bảo quản nơi khô thoáng,
									tránh ánh nắng trực tiếp. <br />
								</p>
							</div>
						</div>
						{/* <Comment
						// dataHref={currentURL} width={'100%'}
						/> */}
					</div>
				</div>
				<HomeFooter />
				{/* <Order detailProduct={this.state.detailProduct} soLuong={count} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietSP);
