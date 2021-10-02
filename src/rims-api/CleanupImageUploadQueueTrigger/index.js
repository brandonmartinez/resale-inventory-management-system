const { BlobServiceClient } = require('@azure/storage-blob');
const assetsBlobServiceClient = BlobServiceClient.fromConnectionString(
	process.env.AssetsStorageConnectionString
);
const assetsInventoryItemImageUploadsContainerClient =
	assetsBlobServiceClient.getContainerClient('inventoryitemimageuploads');

module.exports = async function (context, queueMessage) {
	context.log(
		'JavaScript queue trigger function processed work item',
		queueMessage
	);

	await assetsInventoryItemImageUploadsContainerClient.deleteBlob(queueMessage);
};
