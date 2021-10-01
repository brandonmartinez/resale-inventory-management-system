const DateTime = require('luxon').DateTime;

const temporaryUserId = 'a2a5f680-37db-40ff-9ed3-205d21c47f52';
const getNow = () => DateTime.now().toUTC().toISO({ includeOffset: false });
const { GraphQLUpload } = require('graphql-upload-minimal');

const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		// Inventory Queries
		//////////////////////////////////////////////////
		async getAllInventoryItems(_, __, { dataSources }, info) {
			// Get info passed from GraphQL Query and set needed fields
			const fields = Object.keys(info.parsed.fieldsByTypeName.InventoryItem);

			// Execute query
			const queryResults = await dataSources.inventoryItems.getAllItems({
				fields
			});
			const resources = queryResults.resources;

			return resources;
		},
		async getInventoryItemById(_, { id }, { dataSources }) {
			const queryResults = await dataSources.inventoryItems.findOneById(id);

			return queryResults;
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
			// TODO: this would be pulled from the signed in user - add auth!
			inventoryItem.userId = temporaryUserId;
			inventoryItem.friendlyId =
				await dataSources.inventoryItems.getNextFriendlyId(
					inventoryItem.userId
				);
			inventoryItem.createdAt = getNow();

			const result = await dataSources.inventoryItems.createOne(inventoryItem);
			return result.resource;
		},
		async updateInventoryItem(_, { inventoryItem, images }, { dataSources }) {
			try {
				//https://www.npmjs.com/package/graphql-upload-minimal
				for (const image of await images) {
					const { createReadStream, filename /*, mimetype, encoding */ } =
						(await image).file;
					const key = `${id}/${filename}`;
					console.log(key);
				}

				return { success: true };
			} catch (error) {
				console.log('File upload failed', error);
				return { success: false, message: error.message };
			}

			// TODO: add validation on the id existing - add auth!
			const id = inventoryItem.id;
			delete inventoryItem.id;

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
