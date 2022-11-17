import axios from '../axios';
import querystring from 'querystring';
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
const getAllCodeService = (inputType) => {
	return axios.get(`/api/get-all-code?type=${inputType}`);
};

const sendOrderEmailService = async (inputEmail) => {
	// return axios.post('/api/send-email', inputEmail);

	var bodyFormData = new FormData();
	bodyFormData.append('email', inputEmail);
	let res = await axios({
		method: 'post',
		url: '/api/send-email',
		data: querystring.stringify({ email: inputEmail }),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});
	console.log(res);
	return await res;
};
export {
	handleLoginAPI,
	getAllUsers,
	createNewUserService,
	deleteUserService,
	editUserService,
	getAllCodeService,
	sendOrderEmailService
};
