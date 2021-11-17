// Imports
//////////////////////////////////////////////////

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ApolloClientWithAuth
	from './components/_middleware/ApolloClientWithAuth';
import ContextStateProvider from './providers/ContextStateProvider';
import reportWebVitals from './reportWebVitals';
import getLogger from './utils/getLogger.js';

// Service Setup
//////////////////////////////////////////////////
const logger = getLogger();
logger.debug('Initializing app…')

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

const webVitalsLogger = getLogger('webVitals');
reportWebVitals(webVitalsLogger.debug);
