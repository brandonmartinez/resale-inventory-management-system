import log from 'loglevel';

const getLogger = (name) => {
	const isRoot = !name;

	// Determine if we should use the root or a module logger
	const logger = isRoot ? log : log.getLogger(name);
	
	if (window._env_.environment === 'production') {
		logger.setLevel('error');
	} else {
		log.setLevel('trace');
	}

	return logger;
};

export default getLogger;
