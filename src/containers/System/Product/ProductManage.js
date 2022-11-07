import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
import TableManageProduct from './TableManageProduct';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import './ProductManage.scss';
class ProductManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryArr: [],
			sizeArr: [],
			previewImgURL: '',
			isOpen: false,
			actions: '',

			productId: '',
			productName: '',
			price: '',
			size: '',
			describe: '',
			category: '',
			image: '',
			productEditId: ''
		};
	}

	componentDidMount() {
		this.props.getCategoryStart();
		this.props.getSizeStart();
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.categoryRedux !== this.props.categoryRedux) {
			let arrCategory = this.props.categoryRedux;
			this.setState({
				categoryArr: this.props.categoryRedux,
				category: arrCategory && arrCategory.length > 0 ? arrCategory[0].keyMap : ''
			});
		}
		if (prevProps.sizeRedux !== this.props.sizeRedux) {
			let arrSize = this.props.sizeRedux;
			this.setState({
				sizeArr: this.props.sizeRedux,
				size: arrSize && arrSize.length > 0 ? arrSize[0].keyMap : ''
			});
		}

		if (prevProps.listProducts !== this.props.listProducts) {
			let arrCategory = this.props.categoryRedux;
			let arrSize = this.props.sizeRedux;

			this.setState({
				productId: '',
				productName: '',
				price: '',
				size: arrSize && arrSize.length > 0 ? arrSize[0].keyMap : '',
				describe: '',
				category: arrCategory && arrCategory.length > 0 ? arrCategory[0].keyMap : '',
				image: '',

				actions: CRUD_ACTIONS.CREATE,
				previewImgURL: ''
			});
		}
	}

	openPreviewImage = () => {
		if (!this.state.previewImgURL) return;
		this.setState({
			isOpen: true
		});
	};

	handleOnChangeImage = async (event) => {
		let data = event.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			let objectURL = URL.createObjectURL(file);
			this.setState({
				previewImgURL: objectURL,
				image: base64
			});
		}
	};

	handleSaveProduct = () => {
		let isValid = this.checkValidateInput();
		if (isValid === false) return;
		let { actions } = this.state;

		if (actions === CRUD_ACTIONS.CREATE) {
			this.props.createNewProduct({
				productId: this.state.productId,
				productName: this.state.productName,
				price: this.state.price,
				size: this.state.size,
				describe: this.state.describe,
				category: this.state.category,
				image: this.state.image
			});
		}

		if (actions === CRUD_ACTIONS.EDIT) {
			this.props.editProductRedux({
				id: this.state.productEditId,
				productId: this.state.productId,
				productName: this.state.productName,
				price: this.state.price,
				size: this.state.size,
				describe: this.state.describe,
				category: this.state.category,
				image: this.state.image
			});
		}
	};

	handleEditProductFromParent = (product) => {
		let imageBase64 = '';
		if (product.image) {
			imageBase64 = new Buffer(product.image, 'base64').toString('binary');
		}
		this.setState({
			productId: product.productId,
			productName: product.productName,
			price: product.price,
			size: product.size,
			describe: product.describe,
			category: product.category,
			image: '',

			previewImgURL: imageBase64,
			actions: CRUD_ACTIONS.EDIT,
			productEditId: product.id
		});
	};

	checkValidateInput = () => {
		let isValid = true;
		let arrCheck = [ 'productId', 'productName', 'price', 'describe', 'size', 'category' ];
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
	render() {
		let categorys = this.state.categoryArr;
		let sizes = this.state.sizeArr;

		let { productId, productName, price, describe, category, size } = this.state;

		return (
			<div className="container">
				<div className=" title text-center">Quản lý sản phẩm</div>
				<form>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label>Mã sản phẩm</label>
							<input
								type="text"
								className="form-control"
								value={productId}
								onChange={(event) => {
									this.onChangeInput(event, 'productId');
								}}
							/>
						</div>
						<div className="form-group col-md-6">
							<label>Tên sản phẩm</label>
							<input
								type="text"
								className="form-control"
								value={productName}
								onChange={(event) => {
									this.onChangeInput(event, 'productName');
								}}
							/>
						</div>
						<div className="form-group col-md-6">
							<label>Giá</label>
							<input
								type="text"
								className="form-control"
								value={price}
								onChange={(event) => {
									this.onChangeInput(event, 'price');
								}}
							/>
						</div>
						<div className="form-group col-md-6">
							<label>Mô tả</label>
							<input
								type="text"
								className="form-control"
								value={describe}
								onChange={(event) => {
									this.onChangeInput(event, 'describe');
								}}
							/>
						</div>

						<div className="form-group col-md-4">
							<label htmlFor="inputState">Danh mục</label>
							<select
								className="form-control"
								onChange={(event) => {
									this.onChangeInput(event, 'category');
								}}
							>
								{categorys &&
									categorys.length > 0 &&
									categorys.map((item, index) => {
										return (
											<option key={index} value={item.keyMap}>
												{item.value}
											</option>
										);
									})}
							</select>
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="inputState">Size</label>
							<select
								className="form-control"
								onChange={(event) => {
									this.onChangeInput(event, 'size');
								}}
							>
								{sizes &&
									sizes.length > 0 &&
									sizes.map((item, index) => {
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
									id="image"
									hidden
									onChange={(event) => this.handleOnChangeImage(event)}
								/>
								<label className="label-upload" htmlFor="image">
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
								onClick={() => this.handleSaveProduct()}
							>
								{this.state.actions === CRUD_ACTIONS.EDIT ? 'Cập nhật' : 'Thêm mới'}
							</button>
						</div>
						<div className="col-md-12 mb-5">
							<TableManageProduct
								handleEditProductFromParent={this.handleEditProductFromParent}
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
		categoryRedux: state.product.category,
		sizeRedux: state.product.size,
		listProducts: state.product.products
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getCategoryStart: () => dispatch(actions.fetchCategoryStart()),
		getSizeStart: () => dispatch(actions.fetchSizeStart()),
		createNewProduct: (data) => dispatch(actions.createNewProduct(data)),
		fetchProductRedux: () => dispatch(actions.fetchAllProductsStart()),
		editProductRedux: (data) => dispatch(actions.editProduct(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
