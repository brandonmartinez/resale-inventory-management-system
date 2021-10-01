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

// TODO: https://dev.to/seancwalsh/how-to-write-graphql-middleware-node-apollo-server-express-2h87
const server = new ApolloServer({
	schema: applyMiddleware(schema, ...middleware),
	dataSources: CosmosDbDataSources,
	context: async (req, res) => ({ req, res: res || {} })
});

const handler = server.createHandler({
	cors: {
		origin: '*'
	}
});

module.exports = handler;

// module.exports = async () => {
// 	const request = arguments[1];
// 	try {
// 		const contentType =
// 			request && request.headers && request.headers['content-type'];
// 		if (
// 			typeof contentType === 'string' &&
// 			contentType.includes('multipart/form-data;')
// 		) {
// 			console.debug('In multipart context');
// 			const body = await processRequest(
// 				request,
// 				{},
// 				{
// 					environment: 'azure'
// 				}
// 			).catch((e) => console.log(e));
// 			console.debug('###body', request.body, '####body ', body);
// 			request.body = body; // eslint-disable-line
// 			// context.req.body = body;
// 		}
// 		arguments[1] = request;
// 	} catch (e) {
// 		console.debug('ERROR');
// 		console.debug(e);
// 	}
// 	return handler(...arguments);
// };
