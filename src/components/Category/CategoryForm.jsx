import { useForm } from 'react-hook-form';
import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Button,
	Text,
} from '@chakra-ui/react';
import { useCallback, useContext } from 'react';
import { CategoryContext } from '../../contexts/CategoryProvider';

export default function CategoryForm(props) {
	const {
		isPost,
		categoryID,
		categoryName,
		description,
		link,
		setEditCatPressed,
		setEditPressedComp,
		setAddCatPressed,
	} = props;

	const { editCategory, addCategory } = useContext(CategoryContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submit = useCallback(
		(data) => {
			const { name, description, link } = data;

			if (isPost) {
				addCategory(name, description, link);
				setAddCatPressed(false);
			} else {
				editCategory(categoryID, name, description, link);
				//het form uit de DOM doen, niet setEditPressedComp: geeft error: unmounted comp
				setEditCatPressed(false);
			}
		},
		[
			categoryID,
			editCategory,
			setEditCatPressed,
			addCategory,
			isPost,
			setAddCatPressed,
		]
	);

	const toggleSetEdit = useCallback(() => {
		setEditPressedComp(false);
		setEditCatPressed(false);
	}, [setEditCatPressed, setEditPressedComp]);

	const handleCancel = useCallback(() => {
		if (isPost) {
			setAddCatPressed(false);
		} else {
			toggleSetEdit();
		}
	}, [isPost, setAddCatPressed, toggleSetEdit]);

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
								defaultValue={link}
								data-cy='category_link_input'
							/>
						</Flex>
					</FormControl>
					<FormControl id='name' marginBottom='2'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Name
							</FormLabel>
							<Input
								{...register('name', {
									required: 'Name is a required field!',
								})}
								type='text'
								width='60%'
								defaultValue={categoryName}
								data-cy='category_name_input'
							/>
						</Flex>
					</FormControl>
					<FormControl id='description'>
						<Flex
							justifyContent='space-between'
							alignItems='center'>
							<FormLabel fontWeight='400' width='40%'>
								Description
							</FormLabel>
							<Textarea
								{...register('description')}
								maxLength='100'
								width='60%'
								defaultValue={description}
								data-cy='category_description_input'
							/>
						</Flex>
					</FormControl>
					{Object.keys(errors).length !== 0
						? Object.values(errors).map((err, index) => (
								<Text color='red' key={index} data-cy='categoryform_error'>
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
						<Button
							type='submit'
							marginTop='3'
							width='69%'
							data-cy='category_submit'>
							{isPost ? 'Create' : 'Update'}
						</Button>
					</Flex>
				</Flex>
			</Box>
		</form>
	);
}
