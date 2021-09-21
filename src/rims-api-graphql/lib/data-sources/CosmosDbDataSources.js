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

// Look here: https://www.npmjs.com/package/apollo-datasource-cosmosdb
// And here: https://github.com/Azure-Samples/js-e2e-graphql-cosmosdb-static-web-app/blob/main/api/graphql/data/cosmos/GameDataSource.ts
// Read this: https://xuorig.medium.com/graphql-mutation-design-anemic-mutations-dd107ba70496
// and this: https://www.apollographql.com/blog/graphql/basics/designing-graphql-mutations/
// and this: https://labs.getninjas.com.br/sharing-data-in-a-microservices-architecture-using-graphql-97db59357602
// should the partition key be changed: https://docs.microsoft.com/en-us/azure/cosmos-db/partitioning-overview

module.exports = dataSources;
