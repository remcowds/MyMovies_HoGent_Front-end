import * as movieAPI from '../API/movies';
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
	const [MOVIE_DATA, setMOVIE_DATA] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	//GET request
	const fetchMovies = useCallback(async () => {
		try {
			setError('');
			setLoading(true);

			const dataDB = await movieAPI.fetchMovies();
			setMOVIE_DATA(dataDB.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);

	//POST request
	const addMovie = useCallback(
		async (
			link,
			categoryID,
			directorID,
			title,
			yearOfRelease,
			rating,
			durationInMinutes
		) => {
			try {
				setError('');
				setLoading(true);

				if (yearOfRelease === '') {
					yearOfRelease = null;
				}
				if (rating === '') {
					rating = null;
				}
				if (durationInMinutes === '') {
					durationInMinutes = null;
				}

				const bodyData = {
					linkMov: link,
					categoryID,
					directorID,
					title,
					yearOfRelease,
					rating,
					durationInMinutes,
				};

				const dataDB = await movieAPI.addMovie(bodyData);

				//refresh
				await fetchMovies();
				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[fetchMovies]
	);

	// PUT request
	const editMovie = useCallback(
		async (
			link,
			movieID,
			categoryID,
			directorID,
			title,
			yearOfRelease,
			rating,
			durationInMinutes
		) => {
			try {
				setError('');
				setLoading(true);

				if (yearOfRelease === '') {
					yearOfRelease = null;
				}
				if (rating === '') {
					rating = null;
				}
				if (durationInMinutes === '') {
					durationInMinutes = null;
				}

				const bodyData = {
					linkMov: link,
					categoryID,
					directorID,
					title,
					yearOfRelease,
					rating,
					durationInMinutes,
				};

				const dataDB = await movieAPI.editMovie(movieID, bodyData);

				//refresh
				await fetchMovies();
				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[fetchMovies]
	);

	// DELETE request
	const removeMovie = useCallback(
		async (movieID) => {
			try {
				setError('');
				setLoading(true);
				const dataDB = await movieAPI.removeMovie(movieID);

				//refresh
				await fetchMovies();
				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[fetchMovies]
	);

	useEffect(() => {
		fetchMovies();
	}, [fetchMovies]);

	const values = useMemo(
		() => ({
			MOVIE_DATA,
			loading,
			error,
			removeMovie,
			editMovie,
			addMovie,
		}),
		[MOVIE_DATA, loading, error, removeMovie, editMovie, addMovie]
	);

	return (
		<MovieContext.Provider value={values}>{children}</MovieContext.Provider>
	);
};
