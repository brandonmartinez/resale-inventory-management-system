// Imports
//////////////////////////////////////////////////

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { createUploadLink } from 'apollo-upload-client';

import {
	ApolloClient,
	ApolloProvider,
	from,
	InMemoryCache
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import App from './App';
import { msalConfig } from './authConfig';
import reportWebVitals from './reportWebVitals';

// Service Setup
//////////////////////////////////////////////////
const msalInstance = new PublicClientApplication(msalConfig);

const httpLink = createUploadLink({
	uri: window._env_.API_URI + '/graphql'
});

const retryLink = new RetryLink({
	delay: {
		initial: 300,
		max: Infinity,
		jitter: true
	},
	attempts: {
		max: 5,
		retryIf: (error, _operation) => !!error
	}
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	}

	if (networkError) {
		console.log(`[Network error]: ${networkError}`);
	}
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: from([errorLink, retryLink, httpLink])
});

// Render
//////////////////////////////////////////////////

ReactDOM.render(
	<React.StrictMode>
		<MsalProvider instance={msalInstance}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</MsalProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
