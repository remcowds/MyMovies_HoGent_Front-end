import { Box, Flex, Heading } from '@chakra-ui/layout';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
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
							Register
						</Heading>
					</Flex>
					<RegisterForm />
				</Box>
			</Flex>
		</>
	);
}
