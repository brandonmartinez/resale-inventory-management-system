// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Library Imports
import React from 'react';

import Container from 'react-bootstrap/Container';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

// Components
import Dashboard from './components/dashboard';
import Inventory from './components/inventory';
import CreateInventoryItem from './components/inventory/create';
import Labels from './components/labels';
import Header from './components/layout/header';
import Profile from './components/profile';
import Spaces from './components/spaces';

const App = () => {
	return (
		<Router>
			<Header />
			<Container>
				<Switch>
					<Route path='/inventory/add'>
						<CreateInventoryItem />
					</Route>
					<Route path='/inventory'>
						<Inventory />
					</Route>
					<Route path='/profile'>
						<Profile />
					</Route>
					<Route path='/spaces'>
						<Spaces />
					</Route>
					<Route path='/labels'>
						<Labels />
					</Route>
					<Route path='/'>
						<Dashboard />
					</Route>
				</Switch>
			</Container>
		</Router>
	);
};

export default App;
