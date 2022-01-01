import { axios } from './indexAPI';

export const login = async (userEmail, password) => {
	//returned object user(userEmail, userName) en object token indien juist
	//indien fout error met objecten code, message, details, stack

	const { data } = await axios.post(`/users/login`, {
		userEmail,
		password,
	});

	return data;
};

export const register = async (userEmail, userName, password) => {
	const { data } = await axios.post(`/users/register`, {
		userEmail,
		userName,
		password,
	});
	return data;
};
