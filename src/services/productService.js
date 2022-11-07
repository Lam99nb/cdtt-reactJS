import axios from '../axios';
const createNewProductService = (data) => {
	console.log('check data from  create product service ', data);
	return axios.post('/api/create-new-product', data);
};

const getAllProducts = (inputId) => {
	return axios.get(`/api/get-all-product?id=${inputId}`);
};

const deleteProductService = (productID) => {
	return axios.delete('/api/delete-product', {
		data: {
			id: productID
		}
	});
};

const editProductService = (inputData) => {
	return axios.put('/api/edit-product', inputData);
};

const getTopProductHomeService = (limit) => {
	return axios.get(`/api/get-top-product-home?limit=${limit}`);
};

const getDetailProduct = (inputId) => {
	return axios.get(`/api/get-detail-product-by-id?id=${inputId}`);
};
export {
	createNewProductService,
	getAllProducts,
	deleteProductService,
	editProductService,
	getTopProductHomeService,
	getDetailProduct
};
