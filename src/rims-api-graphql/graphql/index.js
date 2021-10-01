// Imports
//////////////////////////////////////////////////
const join = require('path').join;

const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchemaSync } = require('@graphql-tools/load');
const { addResolversToSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { ApolloServer } = require('apollo-server-azure-functions');
const { processRequest } = require('graphql-upload-minimal');

const middleware = require('../lib/middleware');
const resolvers = require('../lib/resolvers');
const CosmosDbDataSources = require('../lib/data-sources/CosmosDbDataSources');

// Load Apollo
//////////////////////////////////////////////////
const schema = addResolversToSchema({
	schema: loadSchemaSync(join(__dirname, '..', 'lib', 'schema.graphql'), {
		loaders: [new GraphQLFileLoader()]
	}),
	resolvers
});

const createHandler = async () => {
	const server = new ApolloServer({
		schema: applyMiddleware(schema, ...middleware),
		dataSources: CosmosDbDataSources,
		context: (req, res) => ({ req, res: res || {} })
	});

	return server.createHandler();
};

const wrappedHandler = async (context, request) => {
	const handler = await createHandler();
	try {
		const contentType = request.headers['content-type'];
		if (
			typeof contentType === 'string' &&
			contentType.includes('multipart/form-data;')
		) {
			console.debug('In multipart context');
			const body = await processRequest(
				request,
				{},
				{
					environment: 'azure'
				}
			).catch((e) => console.log(e));
			console.debug('###body', request.body, '####body ', body);
			request.body = body;
		}
	} catch (e) {
		console.debug('ERROR');
		console.debug(e);
	}

	return new Promise((resolve, reject) => {
		const originalDone = context.done;

		context.done = (error, result) => {
			originalDone(error, result);

			if (error) {
				reject(error);
			}

			resolve(result);
		};

		handler(context, request);
	});
};

module.exports = wrappedHandler;
