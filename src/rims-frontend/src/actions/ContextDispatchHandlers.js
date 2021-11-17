import log from 'loglevel';

const logger = log.getLogger('ContextDispatchHandlers');

const ContextDispatchHandlers = {
	updateToken: (state, action) => {
		logger.trace('updateToken', state, action);

		return {
			...state,
			token: action.data
		};
	},
	removeToken: (state, action) => {
		logger.trace('removeToken', state, action);
		return {
			...state,
			token: null
		};
	}
};

export default ContextDispatchHandlers;
