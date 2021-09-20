// Imports
//////////////////////////////////////////////////
const ApolloServer = require('apollo-server-azure-functions').ApolloServer;
const gql = require('apollo-server-azure-functions').gql;
const CosmosClient = require('@azure/cosmos').CosmosClient;

// Config
//////////////////////////////////////////////////
const cosmosDbConnectionString = process.env.CosmosKey;
const cosmosDbDatabaseName = 'rims';
const cosmosDbInventoryContainerName = 'Inventory';

// Services
//////////////////////////////////////////////////
const client = new CosmosClient(cosmosDbConnectionString);

const typeDefs = gql`
	enum InventoryItemCondition {
		new
		likenew
		good
		fair
		poor
	}

	type InventoryItem {
		id: ID!
		friendlyId: String!
		name: String!
		Description: String
		Hashtags: String
		Category: String
		Brand: String
		Condition: InventoryItemCondition
		Color: String
		Style: String
		Price: Float
		Cost: Float
	}

	input InventoryItemInput {
		id: ID!
		friendlyId: String!
		name: String!
		Description: String
		Hashtags: String
		Category: String
		Brand: String
		Condition: InventoryItemCondition
		Color: String
		Style: String
		Price: Float
		Cost: Float
	}

	type Query {
		getAllInventory: [InventoryItem]
		getInventoryById(id: ID): InventoryItem
	}

	type Mutation {
		createInventoryItem(inventoryItem: InventoryItemInput): InventoryItem
	}
`;

const resolvers = {
	Query: {
		async getAllInventory(_) {
			let results = await client
				.database(cosmosDbDatabaseName)
				.container(cosmosDbInventoryContainerName)
				.items.query({
					query: 'SELECT * FROM c'
				})
				.fetchAll();

			if (results.resources.length > 0) {
				return results.resources;
			}
			return null;
		},
		async getInventoryById(_, { id }) {
			let results = await client
				.database(cosmosDbDatabaseName)
				.container(cosmosDbInventoryContainerName)
				.items.query({
					query: 'SELECT * FROM c WHERE c.Id = @id',
					parameters: [
						{
							name: '@id',
							value: id
						}
					]
				})
				.fetchAll();

			if (results.resources.length > 0) {
				return results.resources[0];
			}
			return null;
		}
	},
	Mutation: {
		createInventoryItem(_, { inventoryItem }) {
			// Look here: https://www.npmjs.com/package/apollo-datasource-cosmosdb
			// And here: https://github.com/Azure-Samples/js-e2e-graphql-cosmosdb-static-web-app/blob/main/api/graphql/data/cosmos/GameDataSource.ts
			// Read this: https://xuorig.medium.com/graphql-mutation-design-anemic-mutations-dd107ba70496
			// and this: https://www.apollographql.com/blog/graphql/basics/designing-graphql-mutations/
			// and this: https://labs.getninjas.com.br/sharing-data-in-a-microservices-architecture-using-graphql-97db59357602
			// should the partition key be changed: https://docs.microsoft.com/en-us/azure/cosmos-db/partitioning-overview

			console.log(inventoryItem);

			return {
				...inventoryItem
			};
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });
module.exports = server.createHandler();
