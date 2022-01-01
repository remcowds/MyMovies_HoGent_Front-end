import { Flex, Text } from '@chakra-ui/layout';
import { useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import { MovieContext } from '../contexts/MovieProvider';
import Movie from '../components/Movie/Movie';
import Category from '../components/Category/Category';
import Director from '../components/Director/Director';
import Hoofding from '../components/Hoofding';
import React from 'react';
import { Redirect } from 'react-router-dom';

export default React.memo(function MoviePage() {
	const { pathname } = useLocation();
	const { id } = useParams();

	//movie weergeven + zijn category + director

	// get data from ctx
	const { MOVIE_DATA, loading, error } = useContext(MovieContext);

	if (loading) return <Text marginLeft='3'>Loading...</Text>;

	if (error) {
		return <Text marginLeft='3'>{error.response.data.message}</Text>;
	}

	//juiste movie uithalen
	const movieM = MOVIE_DATA.filter((el) => el.movieID === Number(id))[0];

	if (!movieM) {
		return <Redirect from={pathname} to='/home' />;
	}

	//categorie uithalen
	const categoryM = movieM.category;
	const category = (
		<Category
			categoryID={categoryM.categoryID}
			categoryName={categoryM.categoryName}
			description={categoryM.description}
			linkCat={categoryM.linkCat}
			isDetail={true}
		/>
	);

	//director uithalen
	const directorM = movieM.director;
	const director = (
		<Director
			directorID={directorM.directorID}
			directorLastName={directorM.lastName}
			directorFirstName={directorM.firstName}
			birthdate={directorM.birthdate}
			country={directorM.country}
			linkDir={directorM.linkDir}
			isDetail={true}
		/>
	);

	const movie = (
		<Movie
			movieID={movieM.movieID}
			linkMov={movieM.linkMov}
			category={categoryM}
			director={directorM}
			title={movieM.title}
			yearOfRelease={movieM.yearOfRelease}
			rating={movieM.rating}
			durationInMinutes={movieM.durationInMinutes}
			isDetail={true}
		/>
	);

	return (
		<>
			<Hoofding />
			<Flex
				justifyContent='center'
				margin='4'
				marginTop='100px'
				wrap='wrap'>
				{category} {movie} {director}
			</Flex>
		</>
	);
});
