import actionTypes from '../actions/actionTypes';

const initialState = {
	category: [],
	size: [],
	products: [],
	topProduct: [],
	resultsProduct: []
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CATEGORY_SUCCESS:
			state.category = action.data;

			return {
				...state
			};
		case actionTypes.FETCH_CATEGORY_FAILED:
			state.category = [];

			return {
				...state
			};
		case actionTypes.FETCH_SIZE_SUCCESS:
			state.size = action.data;

			return {
				...state
			};
		case actionTypes.FETCH_SIZE_FAILED:
			state.size = [];

			return {
				...state
			};

		case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
			state.products = action.products;

			return {
				...state
			};
		case actionTypes.FETCH_ALL_PRODUCT_FAILED:
			state.products = [];

			return {
				...state
			};
		case actionTypes.FETCH_TOP_PRODUCT_SUCCESS:
			state.topProduct = action.dataProducts;

			return {
				...state
			};
		case actionTypes.FETCH_TOP_PRODUCT_FAILED:
			state.topProduct = [];

			return {
				...state
			};
		case actionTypes.FETCH_PRODUCT_RESULTS_SUCCESS:
			state.resultsProduct = action.resultsProduct;

			return {
				...state
			};
		case actionTypes.FETCH_PRODUCT_RESULTS_FAILED:
			state.resultsProduct = [];

			return {
				...state
			};

		default:
			return state;
	}
};

export default productReducer;
