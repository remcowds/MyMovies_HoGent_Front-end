import { Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import Hoofding from '../components/Hoofding';
import React from 'react';

export default React.memo(function Contact() {
	const mail = () => {
		window.open(
			'mailto:remcodesmedt@hotmail.com?subject=Something about your website'
		);
	};

	return (
		<>
			<Hoofding />
			<Flex justifyContent='center' marginTop='100px'>
				<Button
					width='350px'
					height='75px'
					fontSize='2xl'
					onClick={mail}>
					Click here to contact me
				</Button>
			</Flex>
		</>
	);
});
