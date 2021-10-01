const DateTime = require('luxon').DateTime;
const { BlobServiceClient } = require('@azure/storage-blob');
const blobServiceClient = BlobServiceClient.fromConnectionString(
	process.env.StorageConnectionString
);
const containerClient = blobServiceClient.getContainerClient(
	'inventoryitemimageuploads'
);

const temporaryUserId = 'a2a5f680-37db-40ff-9ed3-205d21c47f52';
const getNow = () => DateTime.now().toUTC().toISO({ includeOffset: false });
const { GraphQLUpload } = require('graphql-upload-minimal');

const uploadImage = async (image, id) => {
	try {
		const { createReadStream, filename } = await image;
		const stream = createReadStream();
		const storedFileName = `${id}-${filename}`;

		// Store the file in the filesystem.
		await new Promise(async (resolve, reject) => {
			const blobName = `${id}/${filename}`;
			const blockBlobClient = containerClient.getBlockBlobClient(blobName);
			const uploadBlobResponse = await blockBlobClient.uploadData(image)

			// In Node.js <= v13, errors are not automatically propagated between piped
			// streams. If there is an error receiving the upload, destroy the write
			// stream with the corresponding error.
			stream.on('error', (error) => writeStream.destroy(error));

			// Pipe the upload into the write stream.
			stream.pipe(writeStream);
		});
	} catch (error) {
		console.log('File upload failed', error);
	}
};

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
			const id = inventoryItem.id;

			const results = await Promise.allSettled(
				images.map((image) => uploadImage(image, id))
			);
			console.log(results);

			// TODO: add validation on the id existing - add auth!

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
