import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: ''
		};
	}

	componentDidMount() {}

	toggle = () => {
		this.props.toggleFromParent();
	};

	handleOnChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState
		});
	};
	checkValidateInput = () => {
		let valid = true;
		let arrInput = [ 'email', 'password', 'firstName', 'lastName', 'address' ];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				valid = false;
				alert('Missing parameter : ' + arrInput[i]);
				break;
			}
		}
		return valid;
	};
	handleAddNewUser = () => {
		let isValid = this.checkValidateInput();
		if (isValid === true) {
			//call API create Modal
			this.props.createNewUser(this.state, 'abc');
		}
		this.setState({
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: ''
		});
	};
	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				toggle={() => {
					this.toggle();
				}}
				className="modal-user-container"
				size="lg"
			>
				<ModalHeader
					toggle={() => {
						this.toggle();
					}}
				>
					Create New User
				</ModalHeader>
				<ModalBody>
					<div className="modal-user-body">
						<div className="input-container">
							<label>Email</label>
							<input
								type="text"
								onChange={(event) => this.handleOnChangeInput(event, 'email')}
								value={this.state.email}
							/>
						</div>
						<div className="input-container">
							<label>Password</label>
							<input
								type="password"
								onChange={(event) => this.handleOnChangeInput(event, 'password')}
								value={this.state.password}
							/>
						</div>
						<div className="input-container">
							<label>FirstName</label>
							<input
								type="text"
								onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
								value={this.state.firstName}
							/>
						</div>
						<div className="input-container">
							<label>LastName</label>
							<input
								type="text"
								onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
								value={this.state.lastName}
							/>
						</div>
						<div className="input-container max-width-input">
							<label>Address</label>
							<input
								type="text"
								onChange={(event) => this.handleOnChangeInput(event, 'address')}
								value={this.state.address}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						className="px-3"
						onClick={() => {
							this.handleAddNewUser();
						}}
					>
						Add New
					</Button>{' '}
					<Button
						color="secondary"
						className="px-3"
						onClick={() => {
							this.toggle();
						}}
					>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
