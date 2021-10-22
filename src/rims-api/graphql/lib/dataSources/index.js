// Imports
//////////////////////////////////////////////////
const CosmosClient = require('@azure/cosmos').CosmosClient;
const InventoryDataSource = require('./InventoryDataSource');

const AzureStorageContainerDataSource = require('./AzureStorageContainerDataSource');
const { BlobServiceClient } = require('@azure/storage-blob');
const assetsBlobServiceClient = BlobServiceClient.fromConnectionString(
	process.env.AssetsStorageConnectionString
);
const assetsInventoryItemImageUploadsContainerClient =
	assetsBlobServiceClient.getContainerClient('inventoryitemimageuploads');
const assetsInventoryItemImagesContainerClient =
	assetsBlobServiceClient.getContainerClient('inventoryitemimages');

// Config
//////////////////////////////////////////////////
const cosmosDbConnectionString = process.env.CosmosDbConnectionString;
const cosmosDbDatabaseName = 'rims';
const cosmosDbInventoryContainerName = 'Inventory';

// Setup Cosmos
//////////////////////////////////////////////////
const client = new CosmosClient(cosmosDbConnectionString);

// Todo: should I just use a single container and create a "modelType" field and partition on that?
const inventoryContainer = client
	.database(cosmosDbDatabaseName)
	.container(cosmosDbInventoryContainerName);

const dataSources = () => ({
	inventoryItems: new InventoryDataSource(inventoryContainer),
	inventoryItemUploadsStorageContainer: new AzureStorageContainerDataSource(
		assetsInventoryItemImageUploadsContainerClient
	),
	inventoryItemsStorageContainer: new AzureStorageContainerDataSource(
		assetsInventoryItemImagesContainerClient
	)
});

module.exports = dataSources;
