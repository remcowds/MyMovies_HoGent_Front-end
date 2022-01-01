import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Text } from '@chakra-ui/layout';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin, useSession } from '../contexts/AuthProvider';
import { useHistory } from 'react-router-dom';

export default function LoginForm() {
	const { loading, error, isAuthed } = useSession();
	const history = useHistory();
	const login = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleCancel = useCallback(() => {
		history.goBack();
	}, [history]);

	const handleLogin = useCallback(
		async ({ email, password }) => {
			const success = await login(email, password);
			if (success) {
				history.replace('/');
			}
		},
		[login, history]
	);

	useEffect(() => {
		if (isAuthed) {
			history.replace('/');
		}
	}, [isAuthed, history]);

	return (
		<form onSubmit={handleSubmit(handleLogin)}>
			<FormControl id='email' marginBottom='2'>
				<Flex justifyContent='space-between' alignItems='center'>
					<FormLabel fontWeight='400' width='30%'>
						Email
					</FormLabel>
					<Input
						{...register('email', {
							required: 'Please enter your email-address.',
						})}
						type='email'
						width='70%'
						placeholder='example@hotmail.com'
						data-cy='login_input_email'
					/>
				</Flex>
			</FormControl>
			<FormControl id='password'>
				<Flex justifyContent='space-between' alignItems='center'>
					<FormLabel fontWeight='400' width='30%'>
						Password
					</FormLabel>
					<Input
						{...register('password', {
							required: 'Please enter your password.',
						})}
						type='password'
						width='70%'
						placeholder='password'
						data-cy='login_input_password'
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
					Login
				</Button>
			</Flex>
		</form>
	);
}
