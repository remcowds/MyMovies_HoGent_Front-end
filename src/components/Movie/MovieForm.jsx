import { useForm } from 'react-hook-form';
import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
	InputGroup,
	InputRightAddon,
	Text,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';

import { useCallback, useContext } from 'react';
import { MovieContext } from '../../contexts/MovieProvider';
import { CategoryContext } from '../../contexts/CategoryProvider';
import { DirectorContext } from '../../contexts/DirectorProvider';

export default function MovieForm(props) {
	const {
		isPost,
		movieID,
		linkMov,
		category,
		director,
		title,
		yearOfRelease,
		rating,
		durationInMinutes,
		setEditMovPressed,
		setEditMovPressedComp,
		setAddMovPressed,
	} = props;

	const { editMovie, addMovie } = useContext(MovieContext);

	const { CATEGORY_DATA } = useContext(CategoryContext);

	const { DIRECTOR_DATA } = useContext(DirectorContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submit = useCallback(
		(data) => {
			const {
				link,
				categoryID,
				directorID,
				title,
				yearOfRelease,
				rating,
				durationInMinutes,
			} = data;

			if (isPost) {
				addMovie(
					link,
					categoryID,
					directorID,
					title,
					yearOfRelease,
					rating,
					durationInMinutes
				);
				setAddMovPressed(false);
			} else {
				editMovie(
					link,
					movieID,
					categoryID,
					directorID,
					title,
					yearOfRelease,
					rating,
					durationInMinutes
				);
				setEditMovPressed(false);
			}
		},
		[
			addMovie,
			editMovie,
			isPost,
			movieID,
			setAddMovPressed,
			setEditMovPressed,
		]
	);

	const toggleSetEdit = useCallback(() => {
		setEditMovPressed(false);
		setEditMovPressedComp(false);
	}, [setEditMovPressed, setEditMovPressedComp]);

	const handleCancel = useCallback(() => {
		if (isPost) {
			setAddMovPressed(false);
		} else {
			toggleSetEdit();
		}
	}, [isPost, setAddMovPressed, toggleSetEdit]);

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
									required: 'Link is a required field!',
									pattern: {
										value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
										message: 'Should be a URL',
									},
								})}
								type='url'
								width='60%'
								defaultValue={linkMov}
								placeholder='https://yourlink.com'
							/>
						</Flex>
					</FormControl>
					<FormControl id='category' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Category
							</FormLabel>
							<Select
								{...register('categoryID', {
									required: 'Category is a required field!',
								})}
								width='60%'
								placeholder='Select category'
								defaultValue={
									category ? category.categoryID : null
								}>
								{CATEGORY_DATA.map((el) => (
									<option
										value={el.categoryID}
										key={el.categoryID}>
										{el.categoryName}
									</option>
								))}
							</Select>
						</Flex>
					</FormControl>
					<FormControl id='director' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Director
							</FormLabel>
							<Select
								{...register('directorID', {
									required: 'Director is a required field!',
								})}
								width='60%'
								placeholder='Select director'
								defaultValue={
									director ? director.directorID : null
								}>
								{DIRECTOR_DATA.map((el) => (
									<option
										value={el.directorID}
										key={el.directorID}>
										{`${el.directorFirstName} ${el.directorLastName}`}
									</option>
								))}
							</Select>
						</Flex>
					</FormControl>
					<FormControl id='title' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Title
							</FormLabel>
							<Input
								{...register('title', {
									required: 'title is a required field!',
								})}
								type='text'
								width='60%'
								defaultValue={title}
								placeholder='Title'
							/>
						</Flex>
					</FormControl>
					<FormControl id='year' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Year of release
							</FormLabel>
							<Input
								{...register('yearOfRelease')}
								type='number'
								width='60%'
								defaultValue={yearOfRelease}
								placeholder='Year'
							/>
						</Flex>
					</FormControl>
					<FormControl id='rating' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Rating
							</FormLabel>
							<NumberInput
								width='60%'
								defaultValue={rating ?? 10}
								max={10}
								min={0}
								precision={1}
								step={0.1}
								clampValueOnBlur={true}>
								<NumberInputField
									{...register('rating', {
										min: 0,
										max: 10,
									})}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</Flex>
					</FormControl>
					<FormControl id='durationInMinutes'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Duration
							</FormLabel>
							<InputGroup width='60%'>
								<Input
									{...register('durationInMinutes')}
									type='number'
									defaultValue={durationInMinutes}
									placeholder={0}
								/>
								<InputRightAddon children='minutes' />
							</InputGroup>
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
							{isPost ? 'Create' : 'Update'}
						</Button>
					</Flex>
				</Flex>
			</Box>
		</form>
	);
}
