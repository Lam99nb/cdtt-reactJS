import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './BuyNow.scss';
import img_pro from '../../../assets/images/somihoanhithietkeSM12982.jpg';
import { Link, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendOrderEmailService } from '../../../services/userService';
import { KEY_PRODUCT_CART } from '../../../utils/constant';

class BuyNow extends Component {
	constructor(props) {
		let item = JSON.parse(localStorage.getItem('setOrder'));

		super(props);
		this.state = {
			activeStep: 0,
			data: 0,
			item: item,

			customerName: '',
			customerPhone: '',
			customerAddress: '',
			customerEmail: '',
			paymentMethod: 'Thanh toán khi nhận hàng',
			listProduct: []
		};
	}

	async componentDidMount() {}
	componentDidUpdate(prevProps, prevState, snapshot) {}

	handleNext = () => {
		let activeStep = this.state.activeStep;
		this.setState({
			activeStep: activeStep + 1
		});
	};

	handleBack = () => {
		let activeStep = this.state.activeStep;
		this.setState({
			activeStep: activeStep - 1
		});
	};

	clickOrder = async () => {
		try {
			let data = await sendOrderEmailService(this.state.customerEmail);
			if (data && data.errCode === 0) {
				toast.info('Đặt hàng thành công! ');
			} else {
				toast.info('Đặt hàng không thành công');
			}
		} catch (e) {
			console.log(e);
		}
	};
	handleOnChangeInput = (event, id) => {
		let valueInput = event.target.value;
		let stateCopy = { ...this.state };
		stateCopy[id] = valueInput;
		this.setState({
			...stateCopy
		});
	};

	handleOnClickInput = () => {
		this.setState({
			paymentMethod: 'Thanh toán khi nhận hàng'
		});
	};
	handleOnClickInput2 = () => {
		this.setState({
			paymentMethod: 'Thanh toán bang thẻ'
		});
	};

	render() {
		const steps = [
			{
				label: 'Thông tin vận chuyển'
			},
			{
				label: 'Thông tin thanh toán'
			}
		];
		const maxSteps = steps.length;
		let activeStep = this.state.activeStep;
		let item = this.state.item;
		// console.log('check state order', this.state.total);

		return (
			<div className="container">
				<div className="row">
					<div className="col-6 main">
						<Link to="/home">
							<div className="logo-text" />
						</Link>
						<div className="info-order">
							<Box sx={{ maxWidth: 400, flexGrow: 1 }}>
								<Paper
									square
									elevation={0}
									sx={{
										display: 'flex',
										alignItems: 'center',
										height: 50,
										pl: 2,
										bgcolor: 'background.default'
									}}
								>
									<Typography className="label-text">{steps[activeStep].label}</Typography>
								</Paper>
								<Box sx={{ height: '100%', maxWidth: 400, width: '100%' }}>
									{activeStep && activeStep === 1 ? (
										<div className="trans-method">
											<div className="trans">
												<h6>Phương thức vận chuyển</h6>
												<div className="trans-group">
													<input type="radio" checked />
													<label for="ttnh">
														Giao hàng tận nơi (phí vận chuyển tạm tính)<span> 30.000₫</span>
													</label>
												</div>
											</div>
											<div className="payment">
												<h6>Phương thức thanh toán</h6>
												<div className="trans-group">
													<input
														type="radio"
														name="fav_language"
														value={this.state.paymentMethod}
														onClick={() => this.handleOnClickInput()}
													/>

													<label for="ttnh">Thanh toán khi nhận hàng</label>
												</div>
												<div className="trans-group">
													<input
														type="radio"
														name="fav_language"
														value={this.state.paymentMethod}
														onClick={() => this.handleOnClickInput2()}
													/>

													<label for="ttmm">Thanh toán thẻ ngân hàng</label>
												</div>
											</div>
										</div>
									) : (
										<form className="form">
											<TextField
												id="email"
												label="Email"
												variant="outlined"
												margin="dense"
												sx={{
													width: 1
												}}
												value={this.state.customerEmail}
												onChange={(event) => this.handleOnChangeInput(event, 'customerEmail')}
											/>
											<TextField
												id="firstName"
												label="Họ và tên"
												variant="outlined"
												margin="dense"
												sx={{
													width: 1
												}}
												value={this.state.customerName}
												onChange={(event) => this.handleOnChangeInput(event, 'customerName')}
											/>
											<TextField
												id="address"
												label="Địa chỉ"
												variant="outlined"
												margin="dense"
												sx={{
													width: 1
												}}
												value={this.state.customerAddress}
												onChange={(event) => this.handleOnChangeInput(event, 'customerAddress')}
											/>
											<TextField
												id="phoneNumber"
												label="Số điện thoại"
												variant="outlined"
												margin="dense"
												sx={{
													width: 1
												}}
												value={this.state.customerPhone}
												onChange={(event) => this.handleOnChangeInput(event, 'customerPhone')}
											/>
										</form>
									)}
								</Box>
								<MobileStepper
									variant="text"
									steps={maxSteps}
									position="static"
									style={{ marginTop: '10px' }}
									activeStep={activeStep}
									nextButton={
										<Button
											size="small"
											onClick={() => this.handleNext()}
											disabled={activeStep === maxSteps - 1}
										>
											Tiếp
										</Button>
									}
									backButton={
										<Button
											size="small"
											onClick={() => this.handleBack()}
											disabled={activeStep === 0}
										>
											Quay lại
										</Button>
									}
								/>
							</Box>
						</div>
					</div>
					<div className="col-6 list-pro">
						<div className="list-pro-table">
							<table id="pro-table">
								<tr>
									<th />
									<th>Sản phẩm</th>
									<th>Số lượng</th>
									<th>Giá</th>
								</tr>
								<tr>
									<td>
										<img class="image-pro" src={item.image} />
									</td>

									<td> {item.productName}</td>
									<td>{item.quantity}</td>
									<td>
										{item.price.toLocaleString('en-US', {
											style: 'currency',
											currency: 'VND'
										})}
									</td>
								</tr>
							</table>
						</div>
						<div className="total-table">
							<table id="pro-table">
								<tr>
									<td>Tạm tính</td>
									<td>
										{(item.price * `${item.quantity}`).toLocaleString('en-US', {
											style: 'currency',
											currency: 'VND'
										})}
									</td>
								</tr>
								<tr>
									<td style={{ fontWeight: 'bold' }}>Tổng tiền</td>
									<td style={{ fontWeight: 'bold' }}>
										{(item.price * `${item.quantity}` + 30000).toLocaleString('en-US', {
											style: 'currency',
											currency: 'VND'
										})}
									</td>
								</tr>
							</table>
						</div>
						{/* <Link to="/home"> */}
						<button type="button" class="btn btn-info btn-lg btn-oder" onClick={() => this.clickOrder()}>
							Đặt hàng
						</button>
						{/* </Link> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyNow);
