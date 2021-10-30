// Imports
//////////////////////////////////////////////////

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { createUploadLink } from 'apollo-upload-client';

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache
} from '@apollo/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

// Service Setup
//////////////////////////////////////////////////
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: createUploadLink({
		uri: window._env_.API_URI + '/graphql'
	})
});

// Render
//////////////////////////////////////////////////

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
