import React, {
	useLayoutEffect,
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

import getLogger from '../../utils/getLogger';
import { msalConfig } from './authConfig';

const logger = getLogger('ApolloClientWithAuth');

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
			logger.trace(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	}

	if (networkError) {
		logger.trace(`[Network error]: ${networkError}`);
	}
});

const msalInstance = new PublicClientApplication(msalConfig);

const ApolloClientWithAuth = ({ children }) => {
	const [token, setToken] = useState(null);
	const accounts = msalInstance.getAllAccounts();
	const account = accounts[0];
	logger.debug(accounts, account);

	useLayoutEffect(() => {
		if (account) {
			logger.debug('acquiring token');
			msalInstance
				.acquireTokenSilent({
					account: account
				})
				.then((response) => {
					logger.debug('token acquired', response);
					setToken(response.idToken);
				})
				.catch((error) => {
					logger.debug('No account or token found.', error);
				});
		}
	}, [account]);

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

	logger.debug('Token Information', account, token);

	return (
		<MsalProvider instance={msalInstance}>
			<ApolloProvider client={client}>{children}</ApolloProvider>
		</MsalProvider>
	);
};

export default ApolloClientWithAuth;
