import actionTypes from '../actions/actionTypes';

const initialState = {
	// isLoadingGenders: false,
	genders: [],
	roles: [],
	users: []
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_GENDER_SUCCESS:
			state.genders = action.data;

			return {
				...state
			};
		case actionTypes.FETCH_GENDER_FAILED:
			state.genders = [];

			return {
				...state
			};
		case actionTypes.FETCH_ROLE_SUCCESS:
			state.roles = action.data;

			return {
				...state
			};
		case actionTypes.FETCH_ROLE_FAILED:
			state.roles = [];

			return {
				...state
			};
		case actionTypes.FETCH_ALL_USER_SUCCESS:
			state.users = action.users;

			return {
				...state
			};
		case actionTypes.FETCH_ALL_USER_FAILED:
			state.users = [];

			return {
				...state
			};

		default:
			return state;
	}
};

export default adminReducer;
