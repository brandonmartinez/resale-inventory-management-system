// Library Imports
import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	useParams
} from 'react-router-dom';

import { useIsAuthenticated } from '@azure/msal-react';

import Dashboard from './components/dashboard';
import Inventory from './components/inventory';
// Components
import CreateInventoryItem from './components/inventory/create';
import UpdateInventoryItem from './components/inventory/update';
import Labels from './components/labels';
import Header from './components/layout/header';
import Profile from './components/profile';
import Spaces from './components/spaces';
import Welcome from './components/welcome';

const ComponentWrapper = ({ Component, ...rest }) => {
	const params = useParams() || {};
	return <Component {...params} {...rest} />;
};

const App = () => {
	const isAuthenticated = useIsAuthenticated();
	const routes = [
		{
			path: '/inventory/add',
			Component: CreateInventoryItem
		},
		{
			path: '/inventory/edit/:id',
			Component: UpdateInventoryItem
		},
		{
			path: '/inventory',
			Component: Inventory
		},
		{
			path: '/profile',
			Component: Profile
		},
		{
			path: '/spaces',
			Component: Spaces
		},
		{
			path: '/labels',
			Component: Labels
		},
		{
			path: '/',
			Component: Dashboard
		}
	];

	const unAuthenticatedRoutes = [
		{
			path: '/',
			Component: Welcome
		}
	];
	return (
		<Router>
			<Header isAuthenticated={isAuthenticated} />
			<div className='container max-w-7xl mx-auto py-0 px-6 md:py-5 md:px-6'>
				<Switch>
					{(isAuthenticated ? routes : unAuthenticatedRoutes).map(
						({ path, Component }, i) => (
							<Route path={path} key={`route-${i}`}>
								<ComponentWrapper
									Component={Component}
									isAuthenticated={isAuthenticated}
								/>
							</Route>
						)
					)}
				</Switch>
			</div>
		</Router>
	);
};
export default App;
