import {
	Heading,
	IconButton,
	Flex,
	Box,
	UnorderedList,
	ListItem,
	useColorMode,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSession, useLogout } from '../contexts/AuthProvider';
import React from 'react';
import TippyCool from './TippyCool';

const navStyling = {
	fontSize: '1.4em',
	position: 'absolute',
	top: '0.5rem',
	left: '0.5rem',
};

const linkStyling = {
	border: '1px solid black',
	borderRadius: '8px',
	padding: '3px',
};

export default React.memo(function Hoofding() {
	const { isAuthed } = useSession();
	const logout = useLogout();

	const handleLogout = useCallback(() => {
		logout();
	}, [logout]);

	const { colorMode, toggleColorMode } = useColorMode();

	const toggleColorModeB = useCallback(() => {
		toggleColorMode();
	}, [toggleColorMode]);

	const isDark = useCallback(() => {
		return colorMode === 'dark';
	}, [colorMode]);

	return (
		<Flex
			width='100%'
			position='relative'
			justifyContent='center'
			padding='2'
			paddingTop='2'>
			<Box style={navStyling}>
				<UnorderedList listStyleType='none' margin='0'>
					<ListItem marginBottom='2'>
						<Link to='/about' style={linkStyling}>
							About
						</Link>
					</ListItem>
					<ListItem marginBottom='2'>
						<Link to='/contact' style={linkStyling}>
							Contact
						</Link>
					</ListItem>
					{isAuthed ? (
						<button style={linkStyling} onClick={handleLogout}>
							Logout
						</button>
					) : (
						<ListItem>
							<Link to='/login' style={linkStyling}>
								Login
							</Link>
						</ListItem>
					)}
				</UnorderedList>
			</Box>
			<TippyCool message='Go back to the home page'>
				<Link to='/home'>
					<Heading size='2xl' justifySelf='center'>
						Movies
					</Heading>
				</Link>
			</TippyCool>
			<TippyCool message='Toggle dark mode'>
				<IconButton
					data-cy='darkmode_button'
					onClick={toggleColorModeB}
					bg='lightgrey'
					position='absolute'
					top='2'
					right='2'
					border='1px'
					borderColor='lightgray'
					backgroundColor={isDark() ? 'rgb(26,32,44)' : 'lightgray'}
					icon={isDark() ? <MdOutlineDarkMode /> : <MdDarkMode />}
				/>
			</TippyCool>
		</Flex>
	);
});
