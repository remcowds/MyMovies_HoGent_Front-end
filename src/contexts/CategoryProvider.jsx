import * as categoryAPI from '../API/categories';
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
	const [CATEGORY_DATA, setCATEGORY_DATA] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// GET request (get all)
	const fetchCategories = useCallback(async () => {
		try {
			setError('');
			setLoading(true);

			const dataDB = await categoryAPI.fetchCategories();

			setCATEGORY_DATA(dataDB.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);

	// POST request
	const addCategory = useCallback(
		async (categoryName, description, link) => {
			try {
				setError('');
				setLoading(true);

				if (description === '') {
					description = null;
				}

				const bodyData = {
					categoryName,
					description,
					linkCat: link,
				};

				const dataDB = await categoryAPI.addCategory(bodyData);

				//verversen
				await fetchCategories();
				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[fetchCategories]
	);

	// PUT request
	const editCategory = useCallback(
		async (id, categoryName, description, link) => {
			try {
				setError('');
				setLoading(true);

				//zodat het in de db niet gwn '' is maar effectief null
				if (description === '') {
					description = null;
				}

				const bodyData = {
					categoryName,
					description,
					linkCat: link,
				};

				const dataDB = await categoryAPI.editCategory(id, bodyData);

				//verversen
				await fetchCategories();

				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[fetchCategories]
	);

	//DELETE request
	const removeCategory = useCallback(
		async (id) => {
			try {
				setError('');
				setLoading(true);

				const dataDB = await categoryAPI.deleteCategory(id);

				//verversen
				await fetchCategories();

				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[fetchCategories]
	);

	//enkel indien auth gedaan is
	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const values = useMemo(
		() => ({
			CATEGORY_DATA,
			loading,
			error,
			removeCategory,
			editCategory,
			addCategory,
		}),
		[
			CATEGORY_DATA,
			loading,
			error,
			removeCategory,
			editCategory,
			addCategory,
		]
	);

	return (
		<CategoryContext.Provider value={values}>
			{children}
		</CategoryContext.Provider>
	);
};
