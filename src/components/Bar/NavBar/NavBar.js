import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import logoSizeM from '../../../images/logoSizeM.webp';

import './navBar.css';

const drawerWidth = 240;

function NavBar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const container = window !== undefined ? () => window().document.body : undefined;

	const handleDrawerToggle = useCallback(() => {
		setMobileOpen((prevState) => !prevState);
	}, []);

	const [settingsDrawerMenu, setSettingsDrawerMenu] = useState([
		{
			name: 'Home',
			isSelected: true,
			icon: <HomeIcon />,
			page: '/',
		},
		{
			name: 'Courses',
			isSelected: false,
			icon: <MenuBookIcon />,
			page: '/All_Courses',
		},
	]);

	const handleSelectedMenu = useCallback(
		(index) => {
			handleDrawerToggle();
			const newSettingsDrawerMenu = settingsDrawerMenu.map(function (items, i) {
				return i === index ? { ...items, isSelected: true } : { ...items, isSelected: false };
			});

			setSettingsDrawerMenu(newSettingsDrawerMenu);
		},
		[settingsDrawerMenu, handleDrawerToggle]
	);

	const drawer = (
		<Box sx={{ textAlign: 'center' }}>
			<div className="underMenuBrandName">
				<img src={logoSizeM} height="40px" alt="logo" /> Alemeno
			</div>
			<Divider />
			<List className="phoneMenuList">
				{settingsDrawerMenu.map((item, index) => (
					<NavLink to={item?.page} key={index}>
						<ListItemButton
							selected={item.isSelected}
							onClick={() => handleSelectedMenu(index)}
							sx={{ py: 1.7, pl: 4 }}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</NavLink>
				))}
			</List>
		</Box>
	);

	return (
		<Box className="navBar" sx={{ display: 'flex' }}>
			{/* <CssBaseline /> */}
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>

					<div className="brandName">
						<img src={logoSizeM} alt="logo" /> <NavLink to="/"> Alemeno</NavLink>
					</div>

					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{settingsDrawerMenu.map((item, index) => (
							<NavLink to={item?.page} key={index}>
								<Button sx={item.name === 'Cart' ? { ml: 2, color: '#fff' } : { color: '#fff' }}>
									{item.name}
								</Button>
							</NavLink>
						))}
					</Box>
				</Toolbar>
			</AppBar>

			{/* Phone Menu Drawer ↓ */}
			<Box component="nav">
				<Drawer
					container={container}
					className="phoneMenuDrawer"
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
}

NavBar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default NavBar;
