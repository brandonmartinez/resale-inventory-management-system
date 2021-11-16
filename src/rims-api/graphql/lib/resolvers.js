const DateTime = require('luxon').DateTime;

const getNow = () => DateTime.now().toUTC().toISO({ includeOffset: false });
const { GraphQLUpload } = require('graphql-upload-minimal');

const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		// Inventory Queries
		//////////////////////////////////////////////////
		async getAllInventoryItems(_, { orderBy }, { dataSources, user }, info) {
			// Get info passed from GraphQL Query and set needed fields
			const fields = Object.keys(info.parsed.fieldsByTypeName.InventoryItem);

			// Execute query
			const queryResults = await dataSources.inventoryItems.getAllItems({
				fields,
				userId: user.id,
				orderBy
			});
			const resources = queryResults.resources;

			return resources;
		},
		async getInventoryItemById(_, { id }, { dataSources, user }) {
			const queryResults = await dataSources.inventoryItems.findOneById(id);

			// TODO: write a query instead, no need to make a full data call
			if (queryResults.userId !== user.id) {
				return null;
			}

			return queryResults;
		},
		async getNextInventoryFriendlyId(_, __, { dataSources, user }) {
			const result = await dataSources.inventoryItems.getNextFriendlyId(
				user.id
			);
			return result;
		},
		async getLatestInventoryItems(_, { numberOfItems }, { dataSources, user }) {
			const queryResults =
				await dataSources.inventoryItems.getLatestInventoryItems(
					numberOfItems,
					user.id
				);
			const resources = queryResults.resources;
			return resources;
		}
	},
	Mutation: {
		// Inventory Mutations
		//////////////////////////////////////////////////
		async createInventoryItem(_, { inventoryItem }, { dataSources, user }) {
			// TODO: this would be pulled from the signed in user - add auth!
			inventoryItem.userId = user.id;
			inventoryItem.friendlyId =
				await dataSources.inventoryItems.getNextFriendlyId(
					inventoryItem.userId
				);
			inventoryItem.createdAt = getNow();

			const result = await dataSources.inventoryItems.createOne(inventoryItem);
			return result.resource;
		},
		async updateInventoryItem(_, { inventoryItem, images }, { dataSources }) {
			const id = inventoryItem.id;

			const relativeImagePaths =
				await dataSources.inventoryItemUploadsStorageContainer.uploadFiles(
					images,
					{
						basePath: id
					}
				);

			// TODO: add validation on the id existing - add auth!
			delete inventoryItem.id;
			inventoryItem.relativeImageUploadPaths = relativeImagePaths;

			inventoryItem.updatedAt = getNow();
			const result = await dataSources.inventoryItems.updateOnePartial(
				id,
				inventoryItem
			);
			return result.resource;
		}
	}
};

module.exports = resolvers;
