import actionTypes from '../actions/actionTypes';
import {
	getAllCodeService,
	createNewUserService,
	getAllUsers,
	deleteUserService,
	editUserService,
	getAllBills
} from '../../services/userService';

import { toast } from 'react-toastify';
export const fetchGenderStart = () => {
	return async (dispatch, getState) => {
		try {
			// dispatch({ type: actionTypes.FETCH_GENDER_START });
			let res = await getAllCodeService('GENDER');
			if (res && res.errCode === 0) {
				dispatch(fetchGenderSuccess(res.data));
			} else {
				dispatch(fetchGenderFailed());
			}
		} catch (e) {
			dispatch(fetchGenderFailed());
		}
	};
};
export const fetchGenderSuccess = (genderData) => ({
	type: actionTypes.FETCH_GENDER_SUCCESS,
	data: genderData
});

export const fetchGenderFailed = () => ({
	type: actionTypes.FETCH_GENDER_FAILED
});

export const fetchRoleSuccess = (roleData) => ({
	type: actionTypes.FETCH_ROLE_SUCCESS,
	data: roleData
});

export const fetchRoleFailed = () => ({
	type: actionTypes.FETCH_ROLE_FAILED
});

export const fetchRoleStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllCodeService('ROLE');
			if (res && res.errCode === 0) {
				dispatch(fetchRoleSuccess(res.data));
			} else {
				dispatch(fetchRoleFailed());
			}
		} catch (e) {
			dispatch(fetchRoleFailed());
		}
	};
};

export const createNewUser = (data) => {
	return async (dispatch, getState) => {
		try {
			let res = await createNewUserService(data);
			if (res && res.errCode === 0) {
				toast.success('Tạo mới người dùng thành công!');
				dispatch(saveUserSuccess(res.data));
				dispatch(fetchAllUsersStart());
			} else {
				dispatch(saveUserFailed());
			}
		} catch (e) {
			dispatch(saveUserFailed());
			console.log(e);
		}
	};
};

export const saveUserSuccess = (roleData) => ({
	type: actionTypes.CREATE_USER_SUCCESS
});

export const saveUserFailed = () => ({
	type: actionTypes.CREATE_USER_FAILED
});

export const fetchAllUsersStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllUsers('ALL');
			if (res && res.errCode === 0) {
				dispatch(fetchAllUsersSuccess(res.users.reverse()));
			} else {
				toast.error('Fetch người dùng không thành công!');
				dispatch(fetchAllUsersFailed());
			}
		} catch (e) {
			toast.error('Fetch người dùng không thành công!');

			dispatch(fetchAllUsersFailed());
			console.log(e);
		}
	};
};

export const fetchAllUsersSuccess = (data) => ({
	type: actionTypes.FETCH_ALL_USER_SUCCESS,
	users: data
});

export const fetchAllUsersFailed = () => ({
	type: actionTypes.FETCH_ALL_USER_FAILED
});

export const deleteUser = (userId) => {
	return async (dispatch, getState) => {
		try {
			let res = await deleteUserService(userId);
			if (res && res.errCode === 0) {
				toast.success('Xoá người dùng thành công!');

				dispatch(deleteUserSuccess());
				dispatch(fetchAllUsersStart());
			} else {
				toast.error('Xoá người dùng không thành công!');
				dispatch(deleteUserFailed());
			}
		} catch (e) {
			toast.error('Xoá người dùng không thành công!');

			dispatch(deleteUserFailed());
			console.log(e);
		}
	};
};

export const deleteUserSuccess = () => ({
	type: actionTypes.DELETE_USER_SUCCESS
});

export const deleteUserFailed = () => ({
	type: actionTypes.DELETE_USER_FAILED
});

export const editUser = (data) => {
	return async (dispatch, getState) => {
		try {
			let res = await editUserService(data);
			if (res && res.errCode === 0) {
				toast.success('Cập nhật người dùng thành công!');

				dispatch(editUserSuccess());
				dispatch(fetchAllUsersStart());
			} else {
				toast.error('Cập nhật người dùng không thành công!');
				dispatch(editUserFailed());
			}
		} catch (e) {
			toast.error('Cập nhật người dùng không thành công!');

			dispatch(editUserFailed());
			console.log(e);
		}
	};
};

export const editUserSuccess = () => ({
	type: actionTypes.EDIT_USER_SUCCESS
});

export const editUserFailed = () => ({
	type: actionTypes.EDIT_USER_FAILED
});

export const fetchAllBillsStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllBills('ALL');
			if (res && res.errCode === 0) {
				dispatch(fetchAllBillsSuccess(res.bills.reverse()));
			} else {
				toast.error('Fetch hoá đơn không thành công!');
				dispatch(fetchAllBillsFailed());
			}
		} catch (e) {
			toast.error('Fetch hoá đơn không thành công!');

			dispatch(fetchAllBillsFailed());
			console.log(e);
		}
	};
};

export const fetchAllBillsSuccess = (data) => ({
	type: actionTypes.FETCH_ALL_BILL_SUCCESS,
	bills: data
});

export const fetchAllBillsFailed = () => ({
	type: actionTypes.FETCH_ALL_BILL_FAILED
});
