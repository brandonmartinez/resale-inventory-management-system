import log from 'loglevel';

import ContextDispatchHandlers from './ContextDispatchHandlers';

// Update this with any properties wanting to be serialized
const globalPropertiesToSerializeToLocalStorage = [
	'lastModified',
	'selectedAdr',
	'adrs'
];

const updateLocalStorageCache = (newState) => {
	const logger = log.getLogger('updateLocalStorageCache');
	logger.debug('updateLocalStorageCache', newState);

	// Copy wanted global properties to store to localstorage into a new object
	const localStorageCache = {};
	globalPropertiesToSerializeToLocalStorage.forEach((key) => {
		localStorageCache[key] = newState[key];
	});

	// update local storage
	localStorage.setItem('globalState', JSON.stringify(localStorageCache));

	// Special Functionality for ADRs that need their own local storage entry
	const adrs = newState.adrs;
	if (adrs && Array.isArray(adrs)) {
		adrs.forEach((adrKey) => {
			const adr = newState[adrKey];
			if (adr) {
				localStorage.setItem(adrKey, JSON.stringify(adr));
			}
		});
	}

	logger.trace('Updated Local Storage', localStorageCache);
};

export const DispatchActions = Object.keys(ContextDispatchHandlers);

const ContextStateReducer = (state, action) => {
	const logger = log.getLogger('ContextStateReducer');
	logger.debug(state, action);

	state.lastModified = new Date().toUTCString();

	// call the method on this class defined by the type
	var handler = ContextDispatchHandlers[action.type];
	logger.trace('Handler for Action', action, handler);
	if (handler) {
		state = handler(state, action);
	}

	updateLocalStorageCache(state);

	// Return state
	return state;
};

export default ContextStateReducer;
