import * as directorAPI from '../API/directors';
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

export const DirectorContext = createContext();

export const DirectorProvider = ({ children }) => {
	const [DIRECTOR_DATA, setDIRECTOR_DATA] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// GET request (get all)
	const fetchDirectors = useCallback(async () => {
		try {
			setError('');
			setLoading(true);

			const dataDB = await directorAPI.fetchDirectors();

			setDIRECTOR_DATA(dataDB.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);

	// POST request
	const addDirector = useCallback(
		async (
			directorLastName,
			directorFirstName,
			birthdate,
			country,
			link
		) => {
			try {
				setError('');
				setLoading(true);

				if (birthdate === '') {
					birthdate = null;
				}

				if (country === '') {
					country = null;
				}

				const bodyData = {
					directorLastName,
					directorFirstName,
					birthdate,
					country,
					linkDir: link,
				};

				const dataDB = await directorAPI.addDirector(bodyData);

				//verversen
				await fetchDirectors();
				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[fetchDirectors]
	);

	// PUT request
	const editDirector = useCallback(
		async (
			id,
			directorLastName,
			directorFirstName,
			birthdate,
			country,
			link
		) => {
			try {
				setError('');
				setLoading(true);

				if (birthdate === '') {
					birthdate = null;
				}

				if (country === '') {
					country = null;
				}

				const bodyData = {
					directorLastName,
					directorFirstName,
					birthdate,
					country,
					linkDir: link,
				};

				const dataDB = await directorAPI.editDirector(id, bodyData);

				//verversen
				await fetchDirectors();
				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[fetchDirectors]
	);

	//DELETE request
	const removeDirector = useCallback(
		async (id) => {
			try {
				setError('');
				setLoading(true);

				const dataDB = await directorAPI.removeDirector(id);

				//verversen
				await fetchDirectors();

				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[fetchDirectors]
	);

	useEffect(() => {
		fetchDirectors();
	}, [fetchDirectors]);

	const values = useMemo(
		() => ({
			DIRECTOR_DATA,
			loading,
			error,
			removeDirector,
			editDirector,
			addDirector,
		}),
		[
			DIRECTOR_DATA,
			loading,
			error,
			removeDirector,
			editDirector,
			addDirector,
		]
	);

	return (
		<DirectorContext.Provider value={values}>
			{children}
		</DirectorContext.Provider>
	);
};
