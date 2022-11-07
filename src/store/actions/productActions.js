import actionTypes from '../actions/actionTypes';

import { getAllCodeService } from '../../services/userService';
import {
	createNewProductService,
	getAllProducts,
	deleteProductService,
	editProductService,
	getTopProductHomeService
} from '../../services/productService';
import { toast } from 'react-toastify';

export const fetchCategorySuccess = (categoryData) => ({
	type: actionTypes.FETCH_CATEGORY_SUCCESS,
	data: categoryData
});

export const fetchCategoryFailed = () => ({
	type: actionTypes.FETCH_CATEGORY_FAILED
});

export const fetchCategoryStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllCodeService('CATEGORY');
			if (res && res.errCode === 0) {
				dispatch(fetchCategorySuccess(res.data));
			} else {
				dispatch(fetchCategoryFailed());
			}
		} catch (e) {
			dispatch(fetchCategoryFailed());
		}
	};
};

export const fetchSizeSuccess = (sizeData) => ({
	type: actionTypes.FETCH_SIZE_SUCCESS,
	data: sizeData
});

export const fetchSizeFailed = () => ({
	type: actionTypes.FETCH_SIZE_FAILED
});

export const fetchSizeStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllCodeService('SIZE');
			if (res && res.errCode === 0) {
				dispatch(fetchSizeSuccess(res.data));
			} else {
				dispatch(fetchSizeFailed());
			}
		} catch (e) {
			dispatch(fetchSizeFailed());
		}
	};
};

export const createNewProduct = (data) => {
	return async (dispatch, getState) => {
		try {
			let res = await createNewProductService(data);
			if (res && res.errCode === 0) {
				toast.success('Tạo mới sản phẩm thành công!');
				dispatch(saveProductSuccess(res.data));
				// dispatch(fetchAllUsersStart());
			} else {
				dispatch(saveProductFailed());
			}
		} catch (e) {
			dispatch(saveProductFailed());
			console.log(e);
		}
	};
};

export const saveProductSuccess = (roleData) => ({
	type: actionTypes.CREATE_USER_SUCCESS
});

export const saveProductFailed = () => ({
	type: actionTypes.CREATE_PRODUCT_FAILED
});

export const fetchAllProductsStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllProducts('ALL');
			let res2 = await getTopProductHomeService(2);
			console.log(res2);
			if (res && res.errCode === 0) {
				dispatch(fetchAllProductsSuccess(res.product.reverse()));
			} else {
				toast.error('Fetch sản phẩm không thành công!');
				dispatch(fetchAllProductsFailed());
			}
		} catch (e) {
			toast.error('Fetch sản phẩm không thành công!');

			dispatch(fetchAllProductsFailed());
			console.log(e);
		}
	};
};

export const fetchAllProductsSuccess = (data) => ({
	type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
	products: data
});

export const fetchAllProductsFailed = () => ({
	type: actionTypes.FETCH_ALL_PRODUCT_FAILED
});

export const deleteProduct = (userId) => {
	return async (dispatch, getState) => {
		try {
			let res = await deleteProductService(userId);
			if (res && res.errCode === 0) {
				toast.success('Xoá sản phẩm thành công!');

				dispatch(deleteProductSuccess());
				dispatch(fetchAllProductsStart());
			} else {
				toast.error('Xoá sản phẩm không thành công!');
				dispatch(deleteProductFailed());
			}
		} catch (e) {
			toast.error('Xoá sản phẩm không thành công!');

			dispatch(deleteProductFailed());
			console.log(e);
		}
	};
};

export const deleteProductSuccess = () => ({
	type: actionTypes.DELETE_PRODUCT_SUCCESS
});

export const deleteProductFailed = () => ({
	type: actionTypes.DELETE_PRODUCT_FAILED
});

export const editProduct = (data) => {
	return async (dispatch, getState) => {
		try {
			let res = await editProductService(data);
			if (res && res.errCode === 0) {
				toast.success('Cập nhật sản phẩm thành công!');

				dispatch(editProductSuccess());
				dispatch(fetchAllProductsStart());
			} else {
				toast.error('Cập nhật sản phẩm không thành công!');
				dispatch(editProductFailed());
			}
		} catch (e) {
			toast.error('Cập nhật sản phẩm không thành công!');

			dispatch(editProductFailed());
			console.log(e);
		}
	};
};

export const editProductSuccess = () => ({
	type: actionTypes.EDIT_PRODUCT_SUCCESS
});

export const editProductFailed = () => ({
	type: actionTypes.EDIT_PRODUCT_FAILED
});

export const fetchTopProduct = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getTopProductHomeService('');
			console.log(res);
			if (res && res.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_TOP_PRODUCT_SUCCESS,
					dataProducts: res.data
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_TOP_PRODUCT_FAILED
				});
			}
		} catch (e) {
			dispatch({
				type: actionTypes.FETCH_TOP_PRODUCT_FAILED
			});
			console.log(e);
		}
	};
};
