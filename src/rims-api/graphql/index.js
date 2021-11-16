// Imports
//////////////////////////////////////////////////
const join = require('path').join;
const { promisify } = require('util');

const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchemaSync } = require('@graphql-tools/load');
const { addResolversToSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { ApolloServer } = require('apollo-server-azure-functions');
const { processRequest } = require('graphql-upload-minimal');

const jwt = require('jsonwebtoken');
const verifyAadToken = promisify(jwt.verify);

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

const parseAuthToken = async (token) => {
	if (!token || token === 'null') {
		return null;
	}

	// download keys from here: https://thriftandshift.b2clogin.com/thriftandshift.onmicrosoft.com/B2C_1_Thrift_And_Shift_Local_SignUp_SignIn/discovery/v2.0/keys
	var jwksClient = require('jwks-rsa');
	var client = jwksClient({
		jwksUri:
			'https://thriftandshift.b2clogin.com/thriftandshift.onmicrosoft.com/B2C_1_Thrift_And_Shift_Local_SignUp_SignIn/discovery/v2.0/keys'
	});
	function getKey(header, callback) {
		client.getSigningKey(header.kid, function (err, key) {
			var signingKey = key.publicKey || key.rsaPublicKey;
			callback(null, signingKey);
		});
	}
	const result = await verifyAadToken(token, getKey, {
		audience: '2705e341-7317-4dd8-a16a-840eae67e265'
	})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log('JWT is invalid', token, err);
		});

	return result;
};

const createHandler = async () => {
	const server = new ApolloServer({
		schema,
		dataSources,
		context: async ({ request, response }) => {
			// Get the user token from the headers.
			const token = (request.headers.authorization || '').replace(
				'Bearer ',
				''
			);

			// Try to retrieve a user with the token
			const user = await parseAuthToken(token);

			if (!user) {
				throw new Error(request);
				// throw new AuthenticationError('you must be logged in');
			}

			user.id = user.sub;

			return { req: request, res: response || {}, user };
		}
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
