import { Box, Heading, Flex, Button, Text } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';
import { DirectorContext } from '../../contexts/DirectorProvider';
import Director from './Director';
import DirectorForm from './DirectorForm';

export default function DirectorOverview() {
	const [editDirPressed, setEditDirPressed] = useState(false);
	const [addDirPressed, setAddDirPressed] = useState(false);

	// get data from context
	const { DIRECTOR_DATA, loading, error } = useContext(DirectorContext);

	const handleSetAddDirPressed = useCallback(() => {
		setAddDirPressed(!addDirPressed);
	}, [addDirPressed]);

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
					director!
				</Text>
			);
		}
		return <Text marginLeft='3'>{error.message} </Text>;
	}

	return (
		<Box>
			<Flex>
				<Heading size='lg' marginLeft='10' marginBottom='5'>
					Directors
				</Heading>
				<Button
					marginLeft='3'
					disabled={addDirPressed}
					onClick={handleSetAddDirPressed}>
					Add director
				</Button>
			</Flex>
			<Flex wrap='wrap' marginLeft='10' marginRight='10'>
				{addDirPressed ? (
					<DirectorForm
						isPost={true}
						setAddDirPressed={setAddDirPressed}
					/>
				) : DIRECTOR_DATA.length > 0 ? (
					DIRECTOR_DATA.map((el) => (
						<Director
							key={el.directorID}
							{...el}
							editDirPressed={editDirPressed}
							setEditDirPressed={setEditDirPressed}
						/>
					))
				) : (
					<Text>No directors found!</Text>
				)}
			</Flex>
		</Box>
	);
}
