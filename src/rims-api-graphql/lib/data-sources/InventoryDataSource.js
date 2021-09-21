const CosmosDataSource = require('apollo-datasource-cosmosdb').CosmosDataSource;

class InventoryDataSource extends CosmosDataSource {
	async getInventoryItems(itemIds) {
		const inventoryItems = await this.findManyByQuery('SELECT * FROM c');
		return inventoryItems.resources;
	}
}

module.exports = InventoryDataSource;
