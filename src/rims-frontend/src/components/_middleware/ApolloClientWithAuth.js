import React, {
	useEffect,
	useMemo,
	useState
} from 'react';

import { createUploadLink } from 'apollo-upload-client';

import {
	ApolloClient,
	ApolloProvider,
	from,
	InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import { msalConfig } from './authConfig';

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

const ApolloClientWithAuth = ({ children }) => {
	const [token, setToken] = useState(null);
	const msalInstance = useMemo(() => {
		return new PublicClientApplication(msalConfig);
	}, [token]);
	const accounts = msalInstance.getAllAccounts();
	const account = accounts[0];
	console.log(accounts, account);

	useEffect(() => {
		if (account) {
            console.log('acquiring token')
			msalInstance
				.acquireTokenSilent({
					account: account
				})
				.then((response) => {
					console.log('token acquired', response);
					setToken(response.accessToken);
				})
				.catch((error) => {
					console.log('No account or token found.', error);
				});
		}
	}, [account, msalInstance]);

	const withToken = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				Authorization: token ? `Bearer ${token}` : null
			}
		};
	});

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: from([errorLink, retryLink, withToken, httpLink])
	});

	return (
		<MsalProvider instance={msalInstance}>
			<ApolloProvider client={client}>{children}</ApolloProvider>
		</MsalProvider>
	);
};

export default ApolloClientWithAuth;