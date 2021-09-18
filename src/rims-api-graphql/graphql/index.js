const ApolloServer = require('apollo-server-azure-functions').ApolloServer;
const gql = require('apollo-server-azure-functions').gql;

const typeDefs = gql`
	type Query {
		helloWorld: String!
	}
`;

const resolvers = {
	Query: {
		helloWorld() {
			return 'Hello world!';
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });
module.exports = server.createHandler();
