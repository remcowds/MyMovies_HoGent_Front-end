import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';
import Category from './Category';
import { CategoryContext } from '../../contexts/CategoryProvider';
import CategoryForm from './CategoryForm';

export default function CategoryOverview() {
	const [editCatPressed, setEditCatPressed] = useState(false);
	const [addCatPressed, setAddCatPressed] = useState(false);

	// get data from context
	const { CATEGORY_DATA, loading, error } = useContext(CategoryContext);

	const toggleSetAddCatPressed = useCallback(() => {
		setAddCatPressed(!addCatPressed);
	}, [addCatPressed]);

	if (loading) return <Text marginLeft='3'>Loading...</Text>;

	if (error) {
		if (
			error.response?.data.message.includes(
				'foreign key constraint fails'
			)
		) {
			return (
				<Text marginLeft='3'>
					Failed to remove: a movie already uses this as their
					category!
				</Text>
			);
		}
		return <Text marginLeft='3'>{error.message} </Text>;
	}

	return (
		<Box>
			<Flex>
				<Heading size='lg' marginLeft='10' marginBottom='5'>
					Categories
				</Heading>
				<Button
					disabled={addCatPressed}
					marginLeft='3'
					marginRight='3'
					onClick={toggleSetAddCatPressed}
					data-cy='category_overview_addCategory'>
					Add category
				</Button>
			</Flex>
			<Flex
				wrap='wrap'
				marginLeft='10'
				marginRight='10'
				data-cy='category_overview_cats'>
				{addCatPressed ? (
					<CategoryForm
						isPost={true}
						setAddCatPressed={setAddCatPressed}
					/>
				) : CATEGORY_DATA.length > 0 ? (
					CATEGORY_DATA.map((el) => (
						<Category
							{...el}
							key={el.categoryID}
							editCatPressed={editCatPressed}
							setEditCatPressed={setEditCatPressed}
						/>
					))
				) : (
					<Text data-cy='category_overview_nocatsfound'>
						No Categories found!
					</Text>
				)}
			</Flex>
		</Box>
	);
}
