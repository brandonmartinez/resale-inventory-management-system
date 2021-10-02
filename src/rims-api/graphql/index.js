// Imports
//////////////////////////////////////////////////
const join = require('path').join;

const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchemaSync } = require('@graphql-tools/load');
const { addResolversToSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { ApolloServer } = require('apollo-server-azure-functions');
const { processRequest } = require('graphql-upload-minimal');

const middleware = require('./lib/middleware');
const resolvers = require('./lib/resolvers');
const dataSources = require('./lib/dataSources');

// Load Apollo
//////////////////////////////////////////////////
const schema = applyMiddleware(
	addResolversToSchema({
		schema: loadSchemaSync(join(__dirname, 'lib', 'schema.graphql'), {
			loaders: [new GraphQLFileLoader()]
		}),
		resolvers
	}),
	...middleware
);

const createHandler = async () => {
	const server = new ApolloServer({
		schema,
		dataSources,
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
			const body = await processRequest(
				{ req: request },
				{},
				{
					environment: 'azure'
				}
			);
			request.body = body;
		}
	} catch (e) {
		console.error('ERROR', e);
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
