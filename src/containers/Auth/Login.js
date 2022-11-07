import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services/userService';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			isShowPassword: false,
			errorMessage: ''
		};
	}
	handleOnChangeUserName = (event) => {
		this.setState({
			userName: event.target.value
		});
	};
	handleOnChangePassword = (event) => {
		this.setState({
			password: event.target.value
		});
	};
	handleLogin = async () => {
		this.setState({
			errorMessage: ''
		});
		try {
			let data = await handleLoginAPI(this.state.userName, this.state.password);

			if (data && data.errCode !== 0) {
				this.setState({
					errorMessage: data.message
				});
			}
			if (data && data.errCode === 0) {
				this.props.userLoginSuccess(data.user);
			}
		} catch (error) {
			if (error.response) {
				if (error.response.data) {
					this.setState({
						errorMessage: error.response.data.message
					});
				}
			}
		}
	};
	handleIsShowPassword = () => {
		this.setState({
			isShowPassword: !this.state.isShowPassword
		});
	};
	render() {
		return (
			<div className="login-background">
				<div className="login-container">
					<div className="login-content row">
						<div className="col-12 text-login">Login</div>
						<div className="col-12 form-group login-input">
							<label className="">User Name</label>
							<input
								type="text"
								className="form-control"
								value={this.state.userName}
								onChange={(event) => this.handleOnChangeUserName(event)}
							/>
						</div>
						<div className="col-12 form-group login-input">
							<label className="">Password</label>
							<div className="custom-input-password">
								<input
									type={this.state.isShowPassword ? 'text' : 'password'}
									className="form-control"
									value={this.state.password}
									onChange={(event) => this.handleOnChangePassword(event)}
								/>
								<span onClick={() => this.handleIsShowPassword()}>
									<i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'} />
								</span>
							</div>
						</div>
						<div className="col-12" style={{ color: 'red' }}>
							{this.state.errorMessage}
						</div>
						<div className="col-12">
							<button className="btn-login" onClick={() => this.handleLogin()}>
								Login
							</button>
						</div>
						<div className="col-12">
							<span className="forgot-password">Forgot your password?</span>
						</div>
						<div className="col-12 mt-3 text-center">
							<span className="other-login forgot-password ">Or login with:</span>
						</div>
						<div className="col-12 social-login">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-facebook facebook"
								viewBox="0 0 16 16"
							>
								<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-google google"
								viewBox="0 0 16 16"
							>
								<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
							</svg>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
