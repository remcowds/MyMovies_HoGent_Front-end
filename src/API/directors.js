import {
	axios
} from "./indexAPI";

const linkApi = `/directors`;

export const fetchDirectors = async () => {
	return await axios.get(linkApi);
};

export const addDirector = async (bodyData) => {
	return await axios.post(linkApi, bodyData);
};

export const editDirector = async (id, bodyData) => {
	return await axios.put(`${linkApi}/${id}`, bodyData);
};

export const removeDirector = async (id) => {
	return await axios.delete(`${linkApi}/${id}`);
};