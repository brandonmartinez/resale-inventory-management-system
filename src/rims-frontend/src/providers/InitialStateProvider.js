import getLogger from '../utils/getLogger';

const InitialStateProvider = () => {
	const logger = getLogger('InitialStateProvider');
	// check if values are in local storage
	const localStorageGlobalState = localStorage.getItem('globalState');
	let localStorageValues = localStorageGlobalState
		? JSON.parse(localStorageGlobalState)
		: {};

	const token = localStorageValues.token;
	if (!token) {
		// get the token
		logger.debug('No token found, attempting to acquire a new one.');

	}

	// Initialize any default state needed to run the app, merging in
	// anything that was found in local storage
	const initialValues = {
		...localStorageValues
	};

	logger.debug('Returning initial values.', initialValues);
	return initialValues;
};

export default InitialStateProvider;
