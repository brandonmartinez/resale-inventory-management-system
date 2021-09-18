import React from 'react';

// Library Imports
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<Navbar bg='light' expand='lg'>
			<Navbar.Brand href='#home'>
				Resale Inventory Management System (RIMS)
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='me-auto'>
					<Nav.Link to='/' as={Link}>
						Dashboard
					</Nav.Link>
					<Nav.Link to='/spaces' as={Link}>
						Spaces
					</Nav.Link>
					<Nav.Link to='/inventory' as={Link}>
						Inventory
					</Nav.Link>
					<Nav.Link to='/labels' as={Link}>
						Labels
					</Nav.Link>
					<NavDropdown title='User Name' id='basic-nav-dropdown'>
						<NavDropdown.Item to='/profile' as={Link}>
							Profile
						</NavDropdown.Item>
						<NavDropdown.Item to='/profile/preferences' as={Link}>
							Preferences
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item to='/logout' as={Link}>
							Logout
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
