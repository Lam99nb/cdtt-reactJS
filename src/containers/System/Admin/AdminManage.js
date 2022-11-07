import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './AdminManage.scss';
import TableManageAdmin from './TableManageAdmin';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
class AdminManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			genderArr: [],
			roleArr: [],
			previewImgURL: '',
			isOpen: false,

			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: '',
			phonenumber: '',
			gender: '',
			role: '',
			avatar: '',

			actions: '',
			userEditId: ''
		};
	}
	async componentDidMount() {
		this.props.getGenderStart();
		this.props.getRolesStart();
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.genderRedux !== this.props.genderRedux) {
			let arrGenders = this.props.genderRedux;
			this.setState({
				genderArr: this.props.genderRedux,
				gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
			});
		}
		if (prevProps.roleRedux !== this.props.roleRedux) {
			let arrRoles = this.props.roleRedux;

			this.setState({
				roleArr: this.props.roleRedux,
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
			});
		}

		if (prevProps.listUsers !== this.props.listUsers) {
			let arrGenders = this.props.genderRedux;
			let arrRoles = this.props.roleRedux;

			this.setState({
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				address: '',
				phonenumber: '',
				gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
				avatar: '',
				actions: CRUD_ACTIONS.CREATE,
				previewImgURL: ''
			});
		}
	}
	handleOnChangeImage = async (event) => {
		let data = event.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			let objectURL = URL.createObjectURL(file);
			this.setState({
				previewImgURL: objectURL,
				avatar: base64
			});
		}
	};
	openPreviewImage = () => {
		if (!this.state.previewImgURL) return;
		this.setState({
			isOpen: true
		});
	};
	handleSaveUser = () => {
		let isValid = this.checkValidateInput();
		if (isValid === false) return;
		let { actions } = this.state;
		if (actions === CRUD_ACTIONS.CREATE) {
			this.props.createNewUser({
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
				phonenumber: this.state.phonenumber,
				gender: this.state.gender,
				roleid: this.state.role,
				avatar: this.state.avatar
			});
		}
		if (actions === CRUD_ACTIONS.EDIT) {
			this.props.editUserRedux({
				id: this.state.userEditId,
				email: this.state.email,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
				phonenumber: this.state.phonenumber,
				gender: this.state.gender,
				roleid: this.state.role,
				avatar: this.state.avatar
			});
		}
	};

	checkValidateInput = () => {
		let isValid = true;
		let arrCheck = [ 'email', 'password', 'firstName', 'lastName', 'phonenumber', 'address' ];
		for (let i = 0; i < arrCheck.length; i++) {
			if (!this.state[arrCheck[i]]) {
				isValid = false;

				alert('Điền vào trường: ' + arrCheck[i]);

				break;
			}
		}
		return isValid;
	};

	onChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;

		this.setState({
			...copyState
		});
	};

	handleEditUserFromParent = (user) => {
		let imageBase64 = '';
		if (user.img) {
			imageBase64 = new Buffer(user.img, 'base64').toString('binary');
		}
		this.setState({
			email: user.email,
			password: 'user.password',
			firstName: user.firstName,
			lastName: user.lastName,
			address: user.address,
			phonenumber: user.phonenumber,
			gender: user.gender,
			role: user.roleid,
			avatar: '',
			previewImgURL: imageBase64,
			actions: CRUD_ACTIONS.EDIT,
			userEditId: user.id
		});
	};
	render() {
		let genders = this.state.genderArr;
		let roles = this.state.roleArr;
		// let isGetGenders = this.props.isLoadingGenders;

		// console.log('gender ', this.props.genderRedux);
		// console.log('role ', this.props.roleRedux);
		let { email, password, firstName, lastName, phonenumber, address, gender, role, avatar } = this.state;

		return (
			<div className="container">
				<div className=" title text-center">Quản lý Admin</div>
				{/* <div>{isGetGenders === true ? 'Loading gender' : ''}</div> */}
				<form>
					<div className="form-row">
						<div className="form-group col-md-3">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								value={email}
								onChange={(event) => {
									this.onChangeInput(event, 'email');
								}}
								disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true : false}
							/>
						</div>
						<div className="form-group col-md-3">
							<label>Mật khẩu</label>
							<input
								type="password"
								className="form-control"
								value={password}
								onChange={(event) => {
									this.onChangeInput(event, 'password');
								}}
								disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true : false}
							/>
						</div>
						<div className="form-group col-md-3">
							<label>Họ</label>
							<input
								type="text"
								className="form-control"
								value={firstName}
								onChange={(event) => {
									this.onChangeInput(event, 'firstName');
								}}
							/>
						</div>
						<div className="form-group col-md-3">
							<label>Tên</label>
							<input
								type="text"
								className="form-control"
								value={lastName}
								onChange={(event) => {
									this.onChangeInput(event, 'lastName');
								}}
							/>
						</div>
						<div className="form-group col-md-3">
							<label>Số điện thoại</label>
							<input
								type="text"
								className="form-control"
								value={phonenumber}
								onChange={(event) => {
									this.onChangeInput(event, 'phonenumber');
								}}
							/>
						</div>
						<div className="form-group col-md-9">
							<label htmlFor="inputAddress">Địa chỉ</label>
							<input
								type="text"
								className="form-control"
								placeholder="20 Mỹ Đình ..."
								value={address}
								onChange={(event) => {
									this.onChangeInput(event, 'address');
								}}
							/>
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="inputState">Giới tính</label>
							<select
								id="inputState"
								className="form-control"
								onChange={(event) => {
									this.onChangeInput(event, 'gender');
								}}
								value={gender}
							>
								{genders &&
									genders.length > 0 &&
									genders.map((item, index) => {
										return (
											<option key={index} value={item.keyMap}>
												{item.value}
											</option>
										);
									})}
							</select>
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="inputState">Vai trò</label>
							<select
								id="inputState"
								className="form-control"
								onChange={(event) => {
									this.onChangeInput(event, 'role');
								}}
								value={role}
							>
								{roles &&
									roles.length > 0 &&
									roles.map((item, index) => {
										return (
											<option key={index} value={item.keyMap}>
												{item.value}
											</option>
										);
									})}
							</select>
						</div>
						<div className="form-group col-md-4">
							<label>Ảnh</label>
							<div className="preview-img-container">
								<input
									type="file"
									className="form-control"
									id="Avatar"
									hidden
									onChange={(event) => this.handleOnChangeImage(event)}
								/>
								<label className="label-upload" htmlFor="Avatar">
									Tải ảnh <i className="fas fa-upload" />
								</label>
								<div
									className="preview-image"
									style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
									onClick={() => this.openPreviewImage()}
								/>
							</div>
						</div>
						<div className="col-12 my-3">
							<button
								className={
									this.state.actions === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'
								}
								onClick={() => this.handleSaveUser()}
							>
								{this.state.actions === CRUD_ACTIONS.EDIT ? 'Cập nhật' : 'Thêm mới'}
							</button>
						</div>

						<div className="col-md-12 mb-5">
							<TableManageAdmin
								handleEditUserFromParent={this.handleEditUserFromParent}
								actions={this.state.actions}
							/>
						</div>
					</div>
				</form>

				{this.state.isOpen === true && (
					<Lightbox
						mainSrc={this.state.previewImgURL}
						onCloseRequest={() => this.setState({ isOpen: false })}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		genderRedux: state.admin.genders,
		roleRedux: state.admin.roles,
		listUsers: state.admin.users
		// isLoadingGenders: state.admin.isLoadingGenders
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGenderStart: () => dispatch(actions.fetchGenderStart()),
		getRolesStart: () => dispatch(actions.fetchRoleStart()),
		createNewUser: (data) => dispatch(actions.createNewUser(data)),
		fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
		editUserRedux: (data) => dispatch(actions.editUser(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminManage);
