import { Box, Heading, Image, Flex, IconButton, Text } from '@chakra-ui/react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import React, { useCallback, useContext, useState } from 'react';
import { DirectorContext } from '../../contexts/DirectorProvider';
import DirectorForm from './DirectorForm';
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

const formatDate = (date) => {
	if (date === null || date === '') {
		return null;
	}
	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	};
	return new Intl.DateTimeFormat('en-UK', options).format(
		new Date(Date.parse(date))
	);
};

export default function Director(props) {
	const {
		directorID,
		directorLastName,
		directorFirstName,
		birthdate,
		country,
		linkDir,
		editDirPressed,
		setEditDirPressed,
		isDetail,
	} = props;

	const { removeDirector } = useContext(DirectorContext);

	const [editDirPressedComp, setEditDirPressedComp] = useState(false);

	const handleRemove = useCallback(() => {
		removeDirector(directorID);
	}, [removeDirector, directorID]);

	const toggleKeuze = useCallback(() => {
		// setEditPressedComp is om het form component in te laden, setEditCatPressed is om de andere buttons te disablen
		setEditDirPressedComp(!editDirPressedComp);
		setEditDirPressed(!editDirPressed);
	}, [editDirPressed, editDirPressedComp, setEditDirPressed]);

	return (
		<Box width={responsiveWidth}>
			<Box padding='3' paddingLeft='0' paddingTop='0' width='100%'>
				<motion.div style={motionDivStyle} animate={{ x: [100, 0] }}>
					<Box width='100%' height='200' marginBottom='2'>
						<Image
							src={linkDir}
							alt='directorImage'
							boxSize='100%'
							objectFit='contain'
							marginBottom='3'
							borderRadius='15px'
						/>
					</Box>
					<Flex marginBottom='2' justifyContent='space-between'>
						<Heading size='md' maxWidth='65%'>
							{directorFirstName} {directorLastName}
						</Heading>
						{!isDetail ? (
							<Box>
								<IconButton
									disabled={editDirPressed}
									marginLeft='2'
									size='sm'
									icon={<AiOutlineEdit size={25} />}
									onClick={toggleKeuze}
								/>
								<IconButton
									disabled={editDirPressed}
									marginLeft='2'
									size='sm'
									icon={<MdDeleteForever size={25} />}
									onClick={handleRemove}
								/>
							</Box>
						) : null}
					</Flex>
					<Text>
						Birthdate: {''}
						{birthdate === null || birthdate === '' ? (
							<b>No birthdate found!</b>
						) : (
							formatDate(birthdate)
						)}
					</Text>
					<Text>Country: {country ?? <b>No country found!</b>}</Text>
					{editDirPressedComp ? (
						<DirectorForm
							isPost={false}
							directorID={directorID}
							directorLastName={directorLastName}
							directorFirstName={directorFirstName}
							birthdate={birthdate}
							country={country}
							link={linkDir}
							setEditDirPressedComp={setEditDirPressedComp}
							setEditDirPressed={setEditDirPressed}
						/>
					) : null}
				</motion.div>
			</Box>
		</Box>
	);
}
