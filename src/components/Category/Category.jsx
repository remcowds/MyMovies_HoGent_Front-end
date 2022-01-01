import { Box, Heading, Image, Flex, IconButton, Text } from '@chakra-ui/react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import React, { useCallback, useContext, useState } from 'react';
import { CategoryContext } from '../../contexts/CategoryProvider';
import CategoryForm from './CategoryForm';
import { motion } from 'framer-motion';

const responsiveWidth = {
	base: '100%',
	md: '50%',
	lg: '33%',
};

const motionDivStyle = {
	border: '1px solid grey',
	borderRadius: '15px',
	padding: '12.75px',
};

//geen memo: ze gaan sws rerenderen omdat ik hun buttons disable
export default function Category(props) {
	const {
		categoryID,
		categoryName,
		description,
		linkCat,
		editCatPressed,
		setEditCatPressed,
		isDetail,
	} = props;

	const { removeCategory } = useContext(CategoryContext);

	const [editCatPressedComp, setEditCatPressedComp] = useState(false);

	const handleRemove = useCallback(() => {
		removeCategory(categoryID);
	}, [removeCategory, categoryID]);

	const toggleKeuze = useCallback(() => {
		// setEditPressedComp is om het form component in te laden, setEditCatPressed is om de andere buttons te disablen
		setEditCatPressedComp(!editCatPressedComp);
		setEditCatPressed(!editCatPressed);
	}, [editCatPressed, editCatPressedComp, setEditCatPressed]);

	return (
		<Box width={responsiveWidth}>
			<Box padding='3' paddingLeft='0' paddingTop='0' width='100%'>
				<motion.div style={motionDivStyle} animate={{ x: [-100, 0] }}>
					<Box width='100%' height='200' marginBottom='2'>
						<Image
							src={linkCat}
							alt='categoryImage'
							boxSize='100%'
							objectFit='cover'
							marginBottom='3'
							borderRadius='15px'
							data-cy='category_link'
						/>
					</Box>
					<Flex marginBottom='2' justifyContent='space-between'>
						<Heading
							size='md'
							data-cy='category_name'
							maxWidth='65%'>
							{categoryName}
						</Heading>
						{!isDetail ? (
							<Box>
								<IconButton
									disabled={editCatPressed}
									marginLeft='2'
									size='sm'
									icon={<AiOutlineEdit size={25} />}
									onClick={toggleKeuze}
									data-cy='category_edit_button'
								/>

								<IconButton
									disabled={editCatPressed}
									marginLeft='2'
									size='sm'
									icon={<MdDeleteForever size={25} />}
									onClick={handleRemove}
									data-cy='category_delete_button'
								/>
							</Box>
						) : null}
					</Flex>
					<Text data-cy='category_description'>
						{description === null ? (
							<b>no description found</b>
						) : (
							description
						)}
					</Text>
					{editCatPressedComp ? (
						<CategoryForm
							isPost={false}
							categoryID={categoryID}
							categoryName={categoryName}
							description={description}
							link={linkCat}
							setEditPressedComp={setEditCatPressedComp}
							setEditCatPressed={setEditCatPressed}
						/>
					) : null}
				</motion.div>
			</Box>
		</Box>
	);
}
