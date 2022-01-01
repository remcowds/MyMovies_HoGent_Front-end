import { Box, Flex, Text } from '@chakra-ui/react';
import Hoofding from '../components/Hoofding';
import React from 'react';

export default React.memo(function About() {
	return (
		<>
			<Hoofding />
			<Flex justifyContent='center' marginTop='100px'>
				<Box width='50%' textAlign='center'>
					<Text>Hello and welcome to the My movies website.</Text>
					<br />
					<Text>
						On this website you can store the movies you want to
						see, aswell as the director and category.
					</Text>
					<br />
					<Text>
						Others can also view and edit these, so you can use this
						to share the movies with your friends aswell.
					</Text>
					<br />
					<Text border='1px solid black' as='b' padding={2}>
						Creator: Remco De Smedt
					</Text>
				</Box>
			</Flex>
		</>
	);
});
