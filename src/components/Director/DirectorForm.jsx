import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
	Button,
} from '@chakra-ui/react';
import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DirectorContext } from '../../contexts/DirectorProvider';

export default function DirectorForm(props) {
	const {
		isPost,
		directorID,
		directorLastName,
		directorFirstName,
		birthdate,
		country,
		link,
		setEditDirPressed,
		setEditDirPressedComp,
		setAddDirPressed,
	} = props;

	const { editDirector, addDirector } = useContext(DirectorContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submit = useCallback(
		(data) => {
			const {
				directorLastName,
				directorFirstName,
				birthdate,
				country,
				link,
			} = data;

			if (isPost) {
				addDirector(
					directorLastName,
					directorFirstName,
					birthdate,
					country,
					link
				);
				setAddDirPressed(false);
			} else {
				editDirector(
					directorID,
					directorLastName,
					directorFirstName,
					birthdate,
					country,
					link
				);

				//het form uit de DOM doen
				setEditDirPressed(false);
			}
		},
		[
			directorID,
			editDirector,
			setEditDirPressed,
			addDirector,
			isPost,
			setAddDirPressed,
		]
	);

	const toggleSetEdit = useCallback(() => {
		setEditDirPressedComp(false);
		setEditDirPressed(false);
	}, [setEditDirPressed, setEditDirPressedComp]);

	const handleCancel = useCallback(() => {
		if (isPost) {
			setAddDirPressed(false);
		} else {
			toggleSetEdit();
		}
	}, [isPost, setAddDirPressed, toggleSetEdit]);

	return (
		<form onSubmit={handleSubmit(submit)}>
			<Box marginTop='2'>
				<Flex flexDirection='column'>
					<FormControl id='link' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Picture URL
							</FormLabel>
							<Input
								{...register('link', {
									required:
										'Picture URL is a required field!',
									pattern: {
										value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
										message: 'Should be a URL',
									},
								})}
								type='url'
								width='60%'
								defaultValue={link}
							/>
						</Flex>
					</FormControl>
					<FormControl id='directorLastName' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Last name
							</FormLabel>
							<Input
								{...register('directorLastName', {
									required: 'Last name is a required field!',
								})}
								type='text'
								width='60%'
								defaultValue={directorLastName}
							/>
						</Flex>
					</FormControl>
					<FormControl id='directorFirstName' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								First name
							</FormLabel>
							<Input
								{...register('directorFirstName', {
									required: 'First name is a required field!',
								})}
								type='text'
								width='60%'
								defaultValue={directorFirstName}
							/>
						</Flex>
					</FormControl>
					{/* TODO mss validation bij datum dat kleiner is als vandaag */}
					<FormControl id='birthdate' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Birthdate
							</FormLabel>
							<Input
								{...register('birthdate')}
								type='date'
								width='60%'
								defaultValue={birthdate}
							/>
						</Flex>
					</FormControl>
					<FormControl id='country' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Country
							</FormLabel>
							<Input
								{...register('country')}
								type='text'
								width='60%'
								defaultValue={country}
							/>
						</Flex>
					</FormControl>

					{Object.keys(errors).length !== 0
						? Object.values(errors).map((err, index) => (
								<Text color='red' key={index}>
									{err.message}
								</Text>
						  ))
						: null}

					<Flex justifyContent='space-between'>
						<Button
							marginTop='3'
							width='29%'
							onClick={handleCancel}>
							Cancel
						</Button>
						<Button type='submit' marginTop='3' width='69%'>
							{isPost ? 'Create' : 'update'}
						</Button>
					</Flex>
				</Flex>
			</Box>
		</form>
	);
}
