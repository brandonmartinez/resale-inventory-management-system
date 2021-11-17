import React, {
	createContext,
	useContext,
	useReducer
} from 'react';

import log from 'loglevel';

import ContextStateReducer, {
	DispatchActions
} from '../actions/ContextStateReducer';
import InitialStateProvider from './InitialStateProvider';

export const ContextState = createContext();

export const useContextState = () => {
	const logger = log.getLogger('useContextState');
	const [state, dispatch] = useContext(ContextState);

	// Create an object with all the dispatch actions that can be exported
	const actions = {
		dispatch
	};

	DispatchActions.forEach((action) => {
		actions[action] = (data) =>
			dispatch({
				type: action,
				data: data
			});
	});

	logger.trace(
		'Returning Current State and Available Actions',
		state,
		DispatchActions
	);

	return [state, actions];
};

const ContextStateProvider = ({ children }) => (
	<ContextState.Provider
		value={useReducer(ContextStateReducer, InitialStateProvider())}
	>
		{children}
	</ContextState.Provider>
);

export default ContextStateProvider;
