// Imports
//////////////////////////////////////////////////

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ApolloClientWithAuth
	from './components/_middleware/ApolloClientWithAuth';
import reportWebVitals from './reportWebVitals';

// Service Setup
//////////////////////////////////////////////////

// Render
//////////////////////////////////////////////////

ReactDOM.render(
	<React.StrictMode>
		<ApolloClientWithAuth>
			<App />
		</ApolloClientWithAuth>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
