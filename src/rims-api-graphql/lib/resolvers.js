const DateTime = require('luxon').DateTime;

const temporaryUserId = 'a2a5f680-37db-40ff-9ed3-205d21c47f52';

const resolvers = {
	Query: {
		// Inventory Queries
		//////////////////////////////////////////////////
		async getAllInventoryItems(_, __, { dataSources, parseResolveInfo }, info) {
			// Get info passed from GraphQL Query and set needed fields
			const parsedResolveInfo = parseResolveInfo(info);
			const fields = Object.keys(
				parsedResolveInfo.fieldsByTypeName.InventoryItem
			);

			// Execute query
			const queryResults = await dataSources.inventoryItems.getAllItems({
				fields
			});
			const resources = queryResults.resources;

			return resources;
		},
		async getInventoryItemById(_, { id }, { dataSources }) {
			const queryResults = await dataSources.inventoryItems.findOneById(id);
			const resources = queryResults.resources;

			return resources;
		},
		async getNextInventoryFriendlyId(_, __, { dataSources }) {
			const result = await dataSources.inventoryItems.getNextFriendlyId(
				temporaryUserId
			);
			return result;
		},
		async getLatestInventoryItems(_, { numberOfItems }, { dataSources }) {
			const queryResults =
				await dataSources.inventoryItems.getLatestInventoryItems(numberOfItems);
			const resources = queryResults.resources;
			return resources;
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
