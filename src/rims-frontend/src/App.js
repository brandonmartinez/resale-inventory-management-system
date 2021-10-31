// Library Imports
import React from 'react';

import Container from 'react-bootstrap/Container';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useParams
} from 'react-router-dom';

// Components
import Dashboard from './components/dashboard';
import Inventory from './components/inventory';
import CreateInventoryItem from './components/inventory/create';
import UpdateInventoryItem from './components/inventory/update';
import Labels from './components/labels';
import Header from './components/layout/header';
import Profile from './components/profile';
import Spaces from './components/spaces';

const ParamWrapper = ({ Component, ...rest }) => {
	const params = useParams();
	return <Component {...params} {...rest} />;
};

const App = () => (
	<Router>
		<Header />
		<Container>
			<Switch>
				<Route path='/inventory/add'>
					<CreateInventoryItem />
				</Route>
				<Route path='/inventory/edit/:id'>
					<ParamWrapper Component={UpdateInventoryItem} />
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

export default App;
