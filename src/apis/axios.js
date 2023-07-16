import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default instance;
