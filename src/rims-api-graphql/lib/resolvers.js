const resolvers = {
	Query: {
		async getAllInventory(_, __, { dataSources }) {
			return await dataSources.inventoryItems.getInventoryItems([]);
		}
	},
	Mutation: {
		async createInventoryItem(_, { inventoryItem }, { dataSources }) {
			const result = await dataSources.inventoryItems.createOne(inventoryItem);
            return result.resource;
		}
	}
};

module.exports = resolvers;
