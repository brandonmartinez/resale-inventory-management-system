const { v4: uuidv4 } = require('uuid');
const { extname: getExtensionName } = require('path');
const { streamToBuffer } = require('@jorgeferrero/stream-to-buffer');

class AzureStorageContainerDataSource {
	constructor(storageContainerClient) {
		this.storageContainerClient = storageContainerClient;
	}

	async uploadFile(file, options = {}) {
		try {
			const { createReadStream, filename, encoding, mimetype } = await file;

			// Build the proposed filename
			const id = uuidv4();
			const extension = getExtensionName(filename);
			const basePath = options.basePath ? options.basePath + '/' : '';
			const blobPath = `${basePath}${id}${extension}`;
			console.log(`Attempting to upload ${filename} to ${blobPath}`);

			const stream = createReadStream();
			const buffer = await streamToBuffer(stream);

			const blockBlobClient =
				this.storageContainerClient.getBlockBlobClient(blobPath);
			const uploadBlobResponse = await blockBlobClient.uploadData(buffer);
			console.log(uploadBlobResponse);

			return blobPath;
		} catch (error) {
			console.log('File upload failed', error);
		}
	}

	async uploadFiles(files, options = {}) {
		const results = await Promise.allSettled(
			files.map(async (image) => await this.uploadFile(image, options))
		);
		console.log(results);
	}
}

module.exports = AzureStorageContainerDataSource;
