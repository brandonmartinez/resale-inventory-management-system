// Imports
//////////////////////////////////////////////////
const CosmosClient = require('@azure/cosmos').CosmosClient;
const InventoryDataSource = require('./InventoryDataSource');
const UsersDataSource = require('./UsersDataSource');

const AzureStorageContainerDataSource = require('./AzureStorageContainerDataSource');
const { BlobServiceClient } = require('@azure/storage-blob');
const assetsBlobServiceClient = BlobServiceClient.fromConnectionString(
	process.env.ASSETSSTORAGECONNECTIONSTRING
);
const assetsInventoryItemImageUploadsContainerClient =
	assetsBlobServiceClient.getContainerClient('inventoryitemimageuploads');
const assetsInventoryItemImagesContainerClient =
	assetsBlobServiceClient.getContainerClient('inventoryitemimages');

// Config
//////////////////////////////////////////////////
const cosmosDbConnectionString = process.env.COSMOSDBCONNECTIONSTRING;
const cosmosDbDatabaseName = 'rims';
const cosmosDbInventoryContainerName = 'Inventory';
const cosmosDbUsersContainerName = 'Users';

// Setup Cosmos
//////////////////////////////////////////////////
const client = new CosmosClient(cosmosDbConnectionString);

// Todo: should I just use a single container and create a "modelType" field and partition on that?
const inventoryContainer = client
	.database(cosmosDbDatabaseName)
	.container(cosmosDbInventoryContainerName);
const usersContainer = client
	.database(cosmosDbDatabaseName)
	.container(cosmosDbUsersContainerName);

const dataSources = () => ({
	inventoryItems: new InventoryDataSource(inventoryContainer),
	users: new UsersDataSource(usersContainer),
	inventoryItemUploadsStorageContainer: new AzureStorageContainerDataSource(
		assetsInventoryItemImageUploadsContainerClient
	),
	inventoryItemsStorageContainer: new AzureStorageContainerDataSource(
		assetsInventoryItemImagesContainerClient
	)
});

module.exports = dataSources;
