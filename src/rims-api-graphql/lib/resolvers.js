const DateTime = require('luxon').DateTime;

const temporaryUserId = 'a2a5f680-37db-40ff-9ed3-205d21c47f52';

const resolvers = {
	Query: {
		// Inventory Queries
		//////////////////////////////////////////////////
		async getAllInventoryItems(_, __, { dataSources }) {
			return await dataSources.inventoryItems.getAllItems();
		},
		async getInventoryItemById(_, { id }, { dataSources }) {
			return (await dataSources.inventoryItems.findOneById(id)).resources;
		},
		async getNextInventoryFriendlyId(_, __, { dataSources }) {
			return await dataSources.inventoryItems.getNextFriendlyId(
				temporaryUserId
			);
		},
		async getLatestInventoryItems(_, { numberOfItems }, { dataSources }) {
			return (await dataSources.inventoryItems.getLatestInventoryItems(numberOfItems)).resources;
		}
	},
	Mutation: {
		// Inventory Mutations
		//////////////////////////////////////////////////
		async createInventoryItem(_, { inventoryItem }, { dataSources }) {
			// TODO: this would be pulled from the signed in user
			inventoryItem.userId = temporaryUserId;
			inventoryItem.friendlyId =
				await dataSources.inventoryItems.getNextFriendlyId(
					inventoryItem.userId
				);
			inventoryItem.createdAt = DateTime.now()
				.toUTC()
				.toISO({ includeOffset: false });

			const result = await dataSources.inventoryItems.createOne(inventoryItem);
			return result.resource;
		}
	}
};

module.exports = resolvers;
