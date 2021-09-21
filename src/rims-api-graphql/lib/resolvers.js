const resolvers = {
	Query: {
		async getAllInventory(_, __, { dataSources }) {
			return await dataSources.inventoryItems.getInventoryItems([]);
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

module.exports = resolvers;
