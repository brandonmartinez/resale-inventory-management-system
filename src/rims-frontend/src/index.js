// Imports
//////////////////////////////////////////////////

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import App from './App';
import { msalConfig } from './authConfig';
import AuthorizingApolloClientProvider
	from './providers/AuthorizingApolloClientProvider';
import ContextStateProvider from './providers/ContextStateProvider';
import reportWebVitals from './reportWebVitals';
import getLogger from './utils/getLogger.js';

// Service Setup
//////////////////////////////////////////////////
const logger = getLogger();
logger.debug('Initializing app…');

const msalInstance = new PublicClientApplication(msalConfig);

// Render
//////////////////////////////////////////////////

ReactDOM.render(
	<React.StrictMode>
		<MsalProvider instance={msalInstance}>
			<ContextStateProvider>
				<AuthorizingApolloClientProvider>
					<App />
				</AuthorizingApolloClientProvider>
			</ContextStateProvider>
		</MsalProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

const webVitalsLogger = getLogger('webVitals');
reportWebVitals(webVitalsLogger.debug);
