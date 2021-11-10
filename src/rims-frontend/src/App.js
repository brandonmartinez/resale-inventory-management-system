// Library Imports
import React from 'react';

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
import Preferences from './components/profile/preferences';
import Spaces from './components/spaces';

const ParamWrapper = ({ Component, ...rest }) => {
	const params = useParams();
	return <Component {...params} {...rest} />;
};

const App = () => (
	<Router>
		<Header />
		<div className='container max-w-7xl mx-auto py-0 px-6 md:py-5 md:px-6'>
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
				<Route path='/profile/preferences'>
					<Preferences />
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
		</div>
	</Router>
);

export default App;
