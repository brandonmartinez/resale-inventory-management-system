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
import { useMsal } from '@azure/msal-react';

import getLogger from '../../utils/getLogger';

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

const ApolloClientWithAuth = ({ children }) => {
	const { instance: msal, accounts } = useMsal();
	const [token, setToken] = useState(null);
	const account = accounts[0];

	logger.debug('msal state', accounts, account);

	useLayoutEffect(() => {
		if (!token && account) {
			logger.debug('acquiring token');
			msal
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
	}, [token, account, msal]);

	const withToken = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				Authorization: token ? `Bearer ${token}` : null
			}
		};
	});

	const links = token ? [errorLink, retryLink, withToken, httpLink] : [];

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: from(links)
	});

	logger.debug('Token Information', account, token);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientWithAuth;
