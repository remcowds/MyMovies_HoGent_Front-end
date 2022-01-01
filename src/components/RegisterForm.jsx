import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRegister, useSession } from '../contexts/AuthProvider';
import { useHistory } from 'react-router-dom';

export default function RegisterForm() {
	const { loading, isAuthed, error } = useSession();
	const history = useHistory();
	const register = useRegister();

	const {
		register: registerForm,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();

	const handleCancel = useCallback(() => {
		history.goBack();
	}, [history]);

	const handleRegister = useCallback(
		async ({ email, username, password }) => {
			const succes = await register(email, username, password);
			if (succes) {
				history.replace('/');
			}
		},
		[register, history]
	);

	useEffect(() => {
		if (isAuthed) {
			history.replace('/');
		}
	}, [isAuthed, history]);

	return (
		<form onSubmit={handleSubmit(handleRegister)}>
			<FormControl id='email' marginBottom='2'>
				<Flex justifyContent='space-between' alignItems='center'>
					<FormLabel fontWeight='400' width='30%'>
						Email
					</FormLabel>
					<Input
						{...registerForm('email', {
							required: 'Please enter your email-address.',
						})}
						type='email'
						width='70%'
						placeholder='example@hotmail.com'
						data-cy='register_input_email'
					/>
				</Flex>
			</FormControl>
			<FormControl id='username' marginBottom='2'>
				<Flex justifyContent='space-between' alignItems='center'>
					<FormLabel fontWeight='400' width='30%'>
						Username
					</FormLabel>
					<Input
						{...registerForm('username', {
							required: 'Please enter your username.',
						})}
						type='text'
						width='70%'
						placeholder='yourname'
						data-cy='register_input_username'
					/>
				</Flex>
			</FormControl>
			<FormControl id='password' marginBottom='2'>
				<Flex justifyContent='space-between' alignItems='center'>
					<FormLabel fontWeight='400' width='30%'>
						Password
					</FormLabel>
					<Input
						{...registerForm('password', {
							required: 'Please enter your password.',
						})}
						type='password'
						width='70%'
						placeholder='password'
						data-cy='register_input_password'
					/>
				</Flex>
			</FormControl>
			<FormControl id='repeatpassword'>
				<Flex justifyContent='space-between' alignItems='center'>
					<FormLabel fontWeight='400' width='30%'>
						Repeat password
					</FormLabel>
					<Input
						{...registerForm('repeatpassword', {
							required: 'Please enter your password.',
							validate: {
								notIdentical: (value) => {
									const password = getValues('password');
									return password === value
										? null
										: 'Both passwords need to be identical';
								},
							},
						})}
						type='password'
						width='70%'
						placeholder='password'
						data-cy='register_input_repeatpassword'
					/>
				</Flex>
			</FormControl>
			{error ? <Text color='red'>{error}</Text> : null}
			{Object.keys(errors).length !== 0
				? Object.values(errors).map((err, index) => (
						<Text color='red' key={index}>
							{err.message}
						</Text>
				  ))
				: null}
			<Flex justifyContent='space-between'>
				<Button marginTop='3' width='29%' onClick={handleCancel}>
					Cancel
				</Button>
				<Button
					type='submit'
					isDisabled={loading}
					marginTop='3'
					width='69%'
					data-cy='login_submit'>
					Register
				</Button>
			</Flex>
		</form>
	);
}
