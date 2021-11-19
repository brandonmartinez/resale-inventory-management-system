import {
	useLayoutEffect,
	useState
} from 'react';

import {
	gql,
	useQuery
} from '@apollo/client';
import { useMsal } from '@azure/msal-react';

import getLogger from '../../utils/getLogger';
import {
	FileUpload,
	Form,
	Submit,
	TextBox
} from '../shared/forms';

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
	const { accounts } = useMsal();
	const account = accounts[0];

	const { loading: queryLoading, error: queryError, data } = useQuery(getUser);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [avatar, setAvatar] = useState('');
	const [avatarUpload, setAvatarUpload] = useState(null);

	const setUser = (user) => {
		setName(user.name);
		setEmail(user.email);
		setAvatar(user.avatar);
	};

	useLayoutEffect(() => {
		if (queryLoading || queryError) {
			return;
		}

		if (data && data.getUser) {
			setUser(data.getUser);
			return;
		}

		if (!account) {
			logger.error('No account found in msal; abort!');
			throw Error('Must have a logged in user.');
		}

		logger.debug(
			'No user found, using MSAL account and mapping to local object.',
			account
		);

		const msalUser = {
			name: account.name,
			email: account.idTokenClaims.emails[0]
		};

		logger.debug('Setting local user to MSAL account.', msalUser);
		setUser(msalUser);
	}, [queryLoading, queryError, data, account]);

	if (queryLoading) {
		return 'Loading...';
	}
	if (queryError) {
		logger.error(queryError);
		return `Query error! ${queryError.message}`;
	}

	logger.debug('Query finished.', data);

	return (
		<Form>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				<div>
					<FileUpload
						id='product-photos'
						label='Upload Avatar'
						fileTypesMessage='JPG or PNG up to 10MB'
						accept='image/*'
						multiple={false}
						uploadIcon={
							avatarUpload && avatarUpload.preview
								? avatarUpload.preview
								: avatar
						}
						onDrop={(acceptedFiles) => {
							const file = Object.assign(acceptedFiles[0], {
								preview: URL.createObjectURL(acceptedFiles[0])
							});
							setAvatarUpload(file);
						}}
					/>
				</div>
				<div className='md:col-span-2'>
					<TextBox
						id='name'
						label='Name'
						placeholder='Your Display Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextBox
						id='email'
						label='Email'
						placeholder='Your Primary Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Submit />
				</div>
			</div>
		</Form>
	);
};

export default Profile;
