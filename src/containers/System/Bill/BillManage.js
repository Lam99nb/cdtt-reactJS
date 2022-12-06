import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import * as actions from '../../../store/actions';

// import './BillManage.scss';

import { Link } from 'react-router-dom';

class BillManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			billsRedux: []
		};
	}

	componentDidMount() {
		this.props.fetchBillRedux();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.listBills !== this.props.listBills) {
			this.setState({
				billsRedux: this.props.listBills
			});
		}
	}

	render() {
		let arrBills = this.state.billsRedux;

		return (
			<React.Fragment>
				<div className="container">
					<div className=" title text-center" style={{ margin: '20px 0' }}>
						Quản lý hoá đơn
					</div>
					<table id="tableManageAdmin">
						<tbody>
							<tr>
								<th>Mã hoá đơn</th>
								<th>Ngày đặt hàng</th>
								<th>Trạng thái</th>
								<th>Tổng tiền</th>
								<th>Tên khách hàng</th>
								<th>Số điện thoại</th>
							</tr>
							{arrBills &&
								arrBills.length > 0 &&
								arrBills.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.maDH}</td>
											<td>{item.ngay}</td>
											<td>{item.trangThai}</td>
											<td>{item.tong}</td>
											<td>{item.tenKH}</td>
											<td>{item.sdt}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		listBills: state.admin.bills
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBillRedux: () => dispatch(actions.fetchAllBillsStart())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BillManage);
