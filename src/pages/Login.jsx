import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const linkStyling = {
	color: 'blue',
	textDecoration: 'underline',
};

export default function Login() {
	return (
		<>
			<Flex
				justifyContent='center'
				marginTop='3'
				height='50vh'
				alignItems='center'>
				<Box
					border='1px solid black'
					borderRadius='15px'
					padding='3'
					width='80%'
					minWidth='350px'
					maxWidth='550px'>
					<Flex>
						<Heading size='lg' marginBottom='3'>
							Login
						</Heading>
						<Text size='lg' marginLeft='auto' marginTop='1'>
							Don't have an account?{' '}
							<Link to='/register' style={linkStyling}>
								Register!
							</Link>
						</Text>
					</Flex>
					<LoginForm />
				</Box>
			</Flex>
		</>
	);
}
