const { parseResolveInfo } = require('graphql-parse-resolve-info');

const convertInfo = async (resolve, parent, args, context, info) => {
	try {
		const parsedInfo = parseResolveInfo(info);
		info.parsed = parsedInfo;
		return resolve(parent, args, context, info);
	} catch (error) {
		throw `Was unable to process info. ${error}`;
	}
};

module.exports = [convertInfo];
