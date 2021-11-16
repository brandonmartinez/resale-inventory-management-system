const CosmosDataSource = require('apollo-datasource-cosmosdb').CosmosDataSource;

class InventoryDataSource extends CosmosDataSource {
	async getAllItems({ fields, userId, orderBy = 'name' }) {
		const fieldList = fields.map((f) => `c.${f}`).join(', ');

		const inventoryItems = await this.findManyByQuery({
			query: `SELECT ${fieldList} FROM c WHERE c.userId = @userId ORDER BY c.${orderBy}`,
			parameters: [{ name: '@userId', value: userId }]
		});

		return inventoryItems;
	}

	async getLatestInventoryItems(numberOfItems = 5, userId) {
		const inventoryItems = await this.findManyByQuery({
			query:
				'SELECT * FROM c WHERE c.userId = @userId ORDER BY c.createdAt DESC OFFSET 0 LIMIT @limit',
			parameters: [
				{ name: '@userId', value: userId },
				{ name: '@limit', value: numberOfItems }
			]
		});

		return inventoryItems;
	}

	async getNextFriendlyId(userId) {
		// Note: this method does not scale well, but it works fine in small scenarios
		const response = await this.findManyByQuery({
			query:
				'SELECT MAX(c.friendlyId) as friendlyId FROM c where c.userId = @userId',
			parameters: [{ name: '@userId', value: userId }]
		});

		const result = response.resources[0].friendlyId || 0;

		const newFriendlyId = parseInt(result) + 1;
		const paddedFriendlyId = String(newFriendlyId).padStart(10, '0');

		return paddedFriendlyId;
	}
}

module.exports = InventoryDataSource;
