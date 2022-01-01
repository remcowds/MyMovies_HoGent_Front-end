import { axios } from './indexAPI';

const linkApi = `/categories`;

export const fetchCategories = async () => {
	return await axios.get(linkApi);
};

export const addCategory = async (bodyData) => {
	return await axios.post(linkApi, bodyData);
};

export const editCategory = async (id, bodyData) => {
	return await axios.put(`${linkApi}/${id}`, bodyData);
};

export const deleteCategory = async (id) => {
	return await axios.delete(`${linkApi}/${id}`);
};
