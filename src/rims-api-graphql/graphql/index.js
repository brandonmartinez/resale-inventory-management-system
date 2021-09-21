// Imports
//////////////////////////////////////////////////
const GraphQLFileLoader =
	require('@graphql-tools/graphql-file-loader').GraphQLFileLoader;
const loadSchemaSync = require('@graphql-tools/load').loadSchemaSync;
const addResolversToSchema =
	require('@graphql-tools/schema').addResolversToSchema;
const ApolloServer = require('apollo-server-azure-functions').ApolloServer;
const join = require('path').join;

const CosmosDbDataSources = require('../lib/data-sources/CosmosDbDataSources');
const resolvers = require('../lib/resolvers');

// Load Apollo
//////////////////////////////////////////////////
const schema = loadSchemaSync(join(__dirname, '..', 'lib', 'schema.graphql'), {
	loaders: [new GraphQLFileLoader()]
});

const server = new ApolloServer({
	schema: addResolversToSchema({ schema, resolvers }),
	dataSources: CosmosDbDataSources,
	context: {}
});

module.exports = server.createHandler();
