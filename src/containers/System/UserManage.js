import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
			isOpenModalUser: false,
			isOpenModalEditUser: false,
			userEdit: {}
		};
	}

	async componentDidMount() {
		await this.getAllUsersFromReact();
	}

	getAllUsersFromReact = async () => {
		let response = await getAllUsers('ALL');
		if (response && response.errCode === 0) {
			this.setState({
				arrUsers: response.users
			});
		}
	};
	handleAddNewUser = () => {
		this.setState({
			isOpenModalUser: true
		});
	};
	toggleUserModal = () => {
		this.setState({
			isOpenModalUser: !this.state.isOpenModalUser
		});
	};

	toggleEditUserModal = () => {
		this.setState({
			isOpenModalEditUser: !this.state.isOpenModalEditUser
		});
	};
	createNewUser = async (data) => {
		try {
			let response = await createNewUserService(data);
			if (response && response.errCode) {
				alert(response.errMessage);
			} else {
				await this.getAllUsersFromReact();
				this.setState({
					isOpenModalUser: false
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	handleDeleteUser = async (user) => {
		try {
			let res = await deleteUserService(user.id);
			if (res && res.errCode === 0) {
				await this.getAllUsersFromReact();
			} else {
				alert(res.errMessage);
			}
		} catch (e) {
			console.log(e);
		}
	};

	handleEditUser = async (user) => {
		this.setState({
			isOpenModalEditUser: true,
			userEdit: user
		});
	};

	doEditUser = async (user) => {
		try {
			let res = await editUserService(user);
			if (res && res.errCode === 0) {
				this.setState({
					isOpenModalEditUser: false
				});

				await this.getAllUsersFromReact();
			} else {
				alert(res.errCode);
			}
		} catch (e) {
			console.log(e);
		}
	};
	render() {
		let arrUsers = this.state.arrUsers;
		console.log(arrUsers);
		return (
			<div className="users-container">
				<ModalUser
					isOpen={this.state.isOpenModalUser}
					toggleFromParent={this.toggleUserModal}
					createNewUser={this.createNewUser}
				/>

				{this.state.isOpenModalEditUser && (
					<ModalEditUser
						isOpen={this.state.isOpenModalEditUser}
						toggleFromParent={this.toggleEditUserModal}
						currentUser={this.state.userEdit}
						ediUser={this.doEditUser}
					/>
				)}

				<div className="title text-center">Manager users</div>
				<div className="mx-1">
					<button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
						<i class="fas fa-plus" /> Add a new users
					</button>
				</div>
				<div className="users-table mt-3 mx-1">
					<table id="customers">
						<tbody>
							<tr>
								<th>Email</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Address</th>
								<th>Actions</th>
							</tr>

							{arrUsers &&
								arrUsers.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.email}</td>
											<td>{item.firstName}</td>
											<td>{item.lastName}</td>
											<td>{item.address}</td>
											<td>
												<button className="btn-edit" onClick={() => this.handleEditUser(item)}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-pencil-fill"
														viewBox="0 0 16 16"
													>
														<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
													</svg>
												</button>
												<button
													className="btn-delete"
													onClick={() => this.handleDeleteUser(item)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-trash3"
														viewBox="0 0 16 16"
													>
														<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
													</svg>
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
