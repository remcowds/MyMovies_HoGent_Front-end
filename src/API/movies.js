import {
	axios
} from "./indexAPI";

const linkApi = `/movies`;

export const fetchMovies = async () => {
	return await axios.get(linkApi);
};

export const addMovie = async (bodyData) => {
	return await axios.post(linkApi, bodyData);
};

export const editMovie = async (id, bodyData) => {
	return await axios.put(`${linkApi}/${id}`, bodyData);
};

export const removeMovie = async (id) => {
	return await axios.delete(`${linkApi}/${id}`);
};