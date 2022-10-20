import axios from '../axios';

const handleLoginAPI = (email, password) => {
	return axios.post('/api/login', { email, password });
};
const getAllUsers = (inputId) => {
	return axios.get(`/api/get-all-user?id=${inputId}`);
};

const createNewUserService = (data) => {
	console.log('check data from service', data);
	return axios.post('/api/create-new-user', data);
};

const deleteUserService = (userID) => {
	return axios.delete('/api/delete-user', {
		data: {
			id: userID
		}
	});
};

const editUserService = (inputData) => {
	return axios.put('/api/edit-user', inputData);
};
export { handleLoginAPI, getAllUsers, createNewUserService, deleteUserService, editUserService };
