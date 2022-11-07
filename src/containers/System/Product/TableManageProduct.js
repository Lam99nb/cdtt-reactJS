import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import * as actions from '../../../store/actions';

class TableManageProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productsRedux: []
		};
	}
	componentDidMount() {
		this.props.fetchProductRedux();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.listProducts !== this.props.listProducts) {
			this.setState({
				productsRedux: this.props.listProducts
			});
		}
	}
	handleDeleteProduct = (product) => {
		this.props.deleteProductRedux(product.id);
	};

	handleEditProduct = (product) => {
		this.props.handleEditProductFromParent(product);
		console.log('edit product', product);
	};
	render() {
		let arrProducts = this.state.productsRedux;
		// console.log(arrProducts);
		return (
			<div className="users-table mt-3 mx-1">
				<table id="tableManageProduct">
					<tbody>
						<tr>
							<th>Mã sản phẩm</th>
							<th>Tên sản phẩm</th>
							<th>Giá</th>
							<th>Danh mục</th>
							<th>Actions</th>
						</tr>
						{arrProducts &&
							arrProducts.length > 0 &&
							arrProducts.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.productId}</td>
										<td>{item.productName}</td>
										<td>{item.price}</td>
										<td>{item.category}</td>
										<td>
											<button
												onClick={() => this.handleEditProduct(item)}
												className="btn-edit"
												type="button"
											>
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
												type="button"
												onClick={() => this.handleDeleteProduct(item)}
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		listProducts: state.product.products
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProductRedux: () => dispatch(actions.fetchAllProductsStart()),
		deleteProductRedux: (id) => dispatch(actions.deleteProduct(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageProduct);
