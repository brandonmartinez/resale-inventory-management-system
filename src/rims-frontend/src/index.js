// Imports
//////////////////////////////////////////////////

import './index.css';

import React from 'react';

import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import App from './App';
import { msalConfig } from './authConfig';
import Dashboard from './components/dashboard';
import Inventory from './components/inventory';
import CreateInventoryItem from './components/inventory/create';
import UpdateInventoryItem from './components/inventory/update';
import Labels from './components/labels';
import Profile from './components/profile';
import Spaces from './components/spaces';
import Welcome from './components/welcome';
import AuthorizingApolloClientProvider
  from './providers/AuthorizingApolloClientProvider';
import ContextStateProvider from './providers/ContextStateProvider';
import reportWebVitals from './reportWebVitals';
import getLogger from './utils/getLogger.js';
import ProtectedRoute from './utils/ProtectedRoute';

// Service Setup
//////////////////////////////////////////////////
const logger = getLogger();
logger.debug('Initializing app…');

const msalInstance = new PublicClientApplication(msalConfig);

// Render
//////////////////////////////////////////////////

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<MsalProvider instance={msalInstance}>
			<ContextStateProvider>
				<AuthorizingApolloClientProvider>
					<Router>
						<Routes>
							<Route path='/' element={<App />}>
								<Route index element={<Welcome />} />
								<Route
									path='/dashboard'
									element={
										<ProtectedRoute>
											<Dashboard />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/inventory/add'
									element={
										<ProtectedRoute>
											<CreateInventoryItem />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/inventory/edit/:id'
									element={
										<ProtectedRoute>
											<UpdateInventoryItem />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/inventory'
									element={
										<ProtectedRoute>
											<Inventory />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/profile'
									element={
										<ProtectedRoute>
											<Profile />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/spaces'
									element={
										<ProtectedRoute>
											<Spaces />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/labels'
									element={
										<ProtectedRoute>
											<Labels />
										</ProtectedRoute>
									}
								/>
							</Route>
						</Routes>
					</Router>
				</AuthorizingApolloClientProvider>
			</ContextStateProvider>
		</MsalProvider>
	</React.StrictMode>
);

const webVitalsLogger = getLogger('webVitals');
reportWebVitals(webVitalsLogger.debug);
