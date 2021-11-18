import { useLayoutEffect } from 'react';

import {
	gql,
	useQuery
} from '@apollo/client';

import getLogger from '../../utils/getLogger';

const logger = getLogger('profile');

const getUser = gql`
	query GetUser {
		getUser {
			id
			email
			name
			avatar
		}
	}
`;

const createUser = gql`
	mutation CreateUserMutation($user: CreateUser!, $avatar: Upload) {
		createUser(user: $user, avatar: $avatar) {
			email
			name
		}
	}
`;

const updateUser = gql`
	mutation UpdateUserMutation($user: UpdateUser!, $avatar: Upload) {
		updateUser(user: $user, avatar: $avatar) {
			email
			name
		}
	}
`;

const Profile = () => {
	// GraphQL Hooks
	//////////////////////////////////////////////////
	const { loading: queryLoading, error: queryError, data } = useQuery(getUser);
	useLayoutEffect(() => {
		if(!queryLoading && !queryError && !data.getUser) {
			console.log('No user found, attempting to create one.')
		}
	});

	if (queryLoading) {
		return 'Loading...';
	}
	if (queryError) {
		logger.error(queryError);
		return `Query error! ${queryError.message}`;
	}

	logger.debug('Query finished.', data);

	if (!data || !data.getUser) {
		return <div>User Not Found</div>;
	}

	return <div>Coming soon…</div>;
};

export default Profile;
