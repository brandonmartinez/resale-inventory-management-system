// Imports
//////////////////////////////////////////////////
const CosmosClient = require('@azure/cosmos').CosmosClient;

const { BlobServiceClient } = require('@azure/storage-blob');
const assetsBlobServiceClient = BlobServiceClient.fromConnectionString(
	process.env.ASSETSSTORAGECONNECTIONSTRING
);
const assetsInventoryItemImageUploadsContainerClient =
	assetsBlobServiceClient.getContainerClient('inventoryitemimageuploads');

// Cosmos Config
//////////////////////////////////////////////////
const cosmosDbConnectionString = process.env.COSMOSDBCONNECTIONSTRING;
const cosmosDbDatabaseName = 'rims';
const cosmosDbInventoryContainerName = 'Inventory';

const client = new CosmosClient(cosmosDbConnectionString);
const inventoryContainer = client
	.database(cosmosDbDatabaseName)
	.container(cosmosDbInventoryContainerName);

// Execute Trigger
//////////////////////////////////////////////////
module.exports = async function (context, queueMessage) {
	context.log(
		'JavaScript queue trigger function processed work item',
		queueMessage
	);

	// TODO: this process should be done as a stored procedure to fix concurrency issue:
	// https://docs.microsoft.com/en-us/azure/cosmos-db/sql/how-to-write-stored-procedures-triggers-udfs?tabs=javascript
	const [id, blobName] = queueMessage.split(/[\.\/]+/);
	const newName = `${id}/${blobName}.jpg`;
	const results = await inventoryContainer.items
		.query({
			query: 'SELECT * from c where c.id = @id',
			parameters: [{ name: '@id', value: id }]
		})
		.fetchAll();
	const item = results.resources[0];
	const relativeImagePaths = item.relativeImagePaths || [];

	item.relativeImagePaths = [...relativeImagePaths, newName];
	await inventoryContainer.item(id).replace(item);

	await assetsInventoryItemImageUploadsContainerClient.deleteBlob(queueMessage);
};
