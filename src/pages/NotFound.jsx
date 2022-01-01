import { Box, Heading, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';

export default function NotFound() {
	const { pathname } = useLocation();
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setRedirect(true);
		}, 5000);
	}, []);

	return (
		<>
			<Box padding='5'>
				<Heading size='xl'>Page not found</Heading>
				<Text>There is no page with URL {pathname}</Text>
				<Text>You will soon be redirected to the home page.</Text>
			</Box>
			{redirect ? <Redirect from={pathname} to='/home' /> : null}
		</>
	);
}
