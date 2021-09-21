// Imports
//////////////////////////////////////////////////
const CosmosClient = require('@azure/cosmos').CosmosClient;
const InventoryDataSource = require('./InventoryDataSource');

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
	inventoryItems: new InventoryDataSource(inventoryContainer)
});

module.exports = dataSources;
