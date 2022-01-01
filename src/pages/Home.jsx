import { Button, Stack } from '@chakra-ui/react';
import CategoryOverview from '../components/Category/CategoryOverview';
import DirectorOverview from '../components/Director/DirectorOverview';
import MovieOverview from '../components/Movie/MovieOverview';
import { useCallback, useState } from 'react';
import Hoofding from '../components/Hoofding';
import TippyCool from '../components/TippyCool';

const responsiveMarginTop = {
	base: '85px',
	md: '45px',
	lg: '45px',
};

export default function Home() {
	const [keuze, setkeuze] = useState('Movies');

	const pressButton = useCallback((e) => {
		setkeuze(e.target.innerText);
	}, []);

	let overzicht;

	if (keuze === 'Categories') {
		overzicht = <CategoryOverview />;
	}

	if (keuze === 'Directors') {
		overzicht = <DirectorOverview />;
	}

	if (keuze === 'Movies') {
		overzicht = <MovieOverview />;
	}

	const isActive = useCallback(
		(e) => {
			return keuze === e;
		},
		[keuze]
	);

	return (
		<>
			<Hoofding />
			<Stack
				margin='2'
				marginTop={responsiveMarginTop}
				marginBottom='42.5px'
				direction='row'
				spacing={5}
				justifyContent='center'>
				<TippyCool message='View categories'>
					<Button
						colorScheme='teal'
						onClick={pressButton}
						isActive={isActive('Categories')}
						data-cy='home_category_button'>
						Categories
					</Button>
				</TippyCool>
				<TippyCool message='View movies'>
					<Button
						colorScheme='teal'
						onClick={pressButton}
						isActive={isActive('Movies')}>
						Movies
					</Button>
				</TippyCool>
				<TippyCool message='View directors'>
					<Button
						colorScheme='teal'
						onClick={pressButton}
						isActive={isActive('Directors')}>
						Directors
					</Button>
				</TippyCool>
			</Stack>
			{overzicht}
		</>
	);
}
