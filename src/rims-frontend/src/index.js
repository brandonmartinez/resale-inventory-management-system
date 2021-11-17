// Imports
//////////////////////////////////////////////////

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import log from 'loglevel';

import App from './App';
import ApolloClientWithAuth
	from './components/_middleware/ApolloClientWithAuth';
import ContextStateProvider from './providers/ContextStateProvider';
import reportWebVitals from './reportWebVitals';

// Service Setup
//////////////////////////////////////////////////

// TODO: configure this on startup
log.setDefaultLevel('trace');

// Render
//////////////////////////////////////////////////

ReactDOM.render(
	<React.StrictMode>
		<ContextStateProvider>
			<ApolloClientWithAuth>
				<App />
			</ApolloClientWithAuth>
		</ContextStateProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

const logger = log.getLogger('webVitals');
reportWebVitals(logger.trace);
