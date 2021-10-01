const { processRequest } = require('graphql-upload-minimal');

const { parseResolveInfo } = require('graphql-parse-resolve-info');

const processUploads = async (resolve, parent, args, context, info) => {
	try {
		const request = context.req.request;
		const contentType =
			request && request.headers && request.headers['content-type'];
		if (
			typeof contentType === 'string' &&
			contentType.includes('multipart/form-data;')
		) {
			console.debug('In multipart context');
			const body = await processRequest(req, request, {
				environment: 'azure'
			}).catch((e) => console.log(e));
			console.debug('###body', request.body, '####body ', body);
			request.body = body;
		}

		context.req.request = request;
	} catch (e) {
		console.debug('ERROR');
		console.debug(e);
	}

	return resolve(parent, args, context, info);
};

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
