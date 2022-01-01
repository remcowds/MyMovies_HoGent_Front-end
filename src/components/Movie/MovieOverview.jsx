import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Button, Select } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../contexts/MovieProvider';
import MovieForm from './MovieForm';
import Movie from './Movie';
import { CategoryContext } from '../../contexts/CategoryProvider';

export default function MovieOverview() {
	const [editMovPressed, setEditMovPressed] = useState(false);
	const [addMovPressed, setAddMovPressed] = useState(false);
	const [categoryID, setCategoryID] = useState();
	const [movies, setMovies] = useState([]);

	// get data from ctx
	const { MOVIE_DATA, loading, error } = useContext(MovieContext);

	const { CATEGORY_DATA } = useContext(CategoryContext);

	useEffect(() => {
		if (!categoryID) {
			setMovies(MOVIE_DATA);
		} else {
			setMovies(
				MOVIE_DATA.filter(
					(el) => el.category.categoryID === Number(categoryID)
				)
			);
		}
	}, [categoryID, MOVIE_DATA]);

	const toggleSetAddMovPressed = useCallback(() => {
		setAddMovPressed(!addMovPressed);
	}, [addMovPressed]);

	if (loading) return <Text marginLeft='3'>Loading...</Text>;

	if (error) {
		return <Text marginLeft='3'>{error.message}</Text>;
	}

	return (
		<Box>
			<Flex>
				<Heading size='lg' marginLeft='10' marginBottom='5'>
					Movies
				</Heading>
				<Button
					disabled={addMovPressed}
					marginLeft='3'
					onClick={toggleSetAddMovPressed}>
					Add movie
				</Button>
				{!addMovPressed ? (
					<Select
						marginLeft='auto'
						width='175px'
						marginRight='65px'
						placeholder='Select category'
						onChange={(e) => setCategoryID(e.target.value)}>
						{CATEGORY_DATA.map((el) => (
							<option key={el.categoryID} value={el.categoryID}>
								{el.categoryName}
							</option>
						))}
					</Select>
				) : null}
			</Flex>
			<Flex wrap='wrap' marginLeft='10' marginRight='10'>
				{addMovPressed ? (
					<MovieForm
						isPost={true}
						setAddMovPressed={setAddMovPressed}
					/>
				) : movies.length > 0 ? (
					movies.map((el) => (
						<Movie
							key={el.movieID}
							{...el}
							editMovPressed={editMovPressed}
							setEditMovPressed={setEditMovPressed}
						/>
					))
				) : (
					<Text>No movies found!</Text>
				)}
			</Flex>
		</Box>
	);
}
