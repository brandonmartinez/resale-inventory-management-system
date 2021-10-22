const CosmosDataSource = require('apollo-datasource-cosmosdb').CosmosDataSource;

class InventoryDataSource extends CosmosDataSource {
	temporaryUserId = 'a2a5f680-37db-40ff-9ed3-205d21c47f52';

	async getAllItems({ fields, orderBy = 'name' }) {
		const fieldList = fields.map((f) => `c.${f}`).join(', ');

		const inventoryItems = await this.findManyByQuery({
			query: `SELECT ${fieldList} FROM c WHERE c.userId = @userId ORDER BY c.${orderBy}`,
			parameters: [{ name: '@userId', value: this.temporaryUserId }]
		});

		return inventoryItems;
	}

	async getLatestInventoryItems(numberOfItems = 5) {
		const inventoryItems = await this.findManyByQuery({
			query:
				'SELECT * FROM c WHERE c.userId = @userId ORDER BY c.createdAt DESC OFFSET 0 LIMIT @limit',
			parameters: [
				{ name: '@userId', value: this.temporaryUserId },
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
