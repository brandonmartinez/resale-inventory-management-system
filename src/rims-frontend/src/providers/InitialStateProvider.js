import log from 'loglevel';

const InitialStateProvider = () => {
	const logger = log.getLogger('InitialStateProvider');
	// check if values are in local storage
	const localStorageGlobalState = localStorage.getItem('globalState');
	let localStorageValues = localStorageGlobalState
		? JSON.parse(localStorageGlobalState)
		: {};

	const token = localStorageValues.token;
	if (!token) {
		// get the token
		logger.trace('No token found, acquiring a new one.');
	}

	// Initialize any default state needed to run the app, merging in
	// anything that was found in local storage
	const initialValues = {
		...localStorageValues
	};

	logger.trace('Returning initial values.', initialValues);
	return initialValues;
};

export default InitialStateProvider;
