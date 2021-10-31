import React from 'react';

// Library Imports
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import { SearchBox } from '../shared/forms';

const Header = () => {
	return (
		<Navbar bg='light' expand='lg' sticky='top'>
			<Container>
				<Navbar.Brand href='#home' className='mr-5'>
					<img
						src={process.env.PUBLIC_URL + '/thrift-and-shift-logo.png'}
						style={{ maxHeight: '2em', width: 'auto' }}
						alt='Thrift &amp; Shift Logo'
						title='Thrift &amp; Shift - Your Place to Manage Your Thrifting Finds'
					/>
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
					<Nav>
						<Form>
							<SearchBox id='search' label='Search' placeholder='Search…' />
						</Form>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
