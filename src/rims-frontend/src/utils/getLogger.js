import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

const getLogger = (name) => {
	const isRoot = !name;
	const options = {
		template: '[%l] %n @ %t\n',
		timestampFormatter: (date) => date.toString()
	};

	// Determine if we should use the root or a module logger
	const logger = isRoot ? log : log.getLogger(name);
	// TODO: configure this on startup
	logger.setDefaultLevel('trace');

	// Configure prefix
	if (isRoot) {
		prefix.reg(logger);
	}
	prefix.apply(logger, options);

	return logger;
};

export default getLogger;
