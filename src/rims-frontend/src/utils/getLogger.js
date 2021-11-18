import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

const getLogger = (name) => {
	const isRoot = !name;
	const options = {
		template: '%l | module: %n | %t\n',
		timestampFormatter: (date) => date.toString()
	};

	// Determine if we should use the root or a module logger
	const logger = isRoot ? log : log.getLogger(name);
	// TODO: configure this on startup
	logger.setDefaultLevel('trace');

	// Configure prefix
	prefix.reg(log);
	prefix.apply(logger, options);

	return logger;
};

export default getLogger;
