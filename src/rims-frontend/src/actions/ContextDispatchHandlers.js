import getLogger from '../utils/getLogger';

const logger = getLogger('ContextDispatchHandlers');

const ContextDispatchHandlers = {
	updateToken: (state, action) => {
		logger.debug('updateToken', state, action);

		return {
			...state,
			token: action.data
		};
	},
	removeToken: (state, action) => {
		logger.debug('removeToken', state, action);
		return {
			...state,
			token: null
		};
	}
};

export default ContextDispatchHandlers;
