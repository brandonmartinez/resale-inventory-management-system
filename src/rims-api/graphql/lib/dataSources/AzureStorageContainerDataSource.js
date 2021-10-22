const { v4: uuidv4 } = require('uuid');
const { extname: getExtensionName } = require('path');
const { streamToBuffer } = require('@jorgeferrero/stream-to-buffer');

class AzureStorageContainerDataSource {
	constructor(storageContainerClient) {
		this.storageContainerClient = storageContainerClient;
	}

	async uploadFile(file, options = {}) {
		try {
			const {
				createReadStream,
				filename,
				encoding: blobContentEncoding,
				mimetype: blobContentType
			} = await file;

			// Build the proposed filename
			const id = uuidv4();
			const extension = getExtensionName(filename);
			const basePath = options.basePath ? options.basePath + '/' : '';
			const blobPath = `${basePath}${id}${extension}`;

			const stream = createReadStream();
			const buffer = await streamToBuffer(stream);

			const blockBlobClient =
				this.storageContainerClient.getBlockBlobClient(blobPath);
			await blockBlobClient.uploadData(buffer, {
				blobHTTPHeaders: {
					blobContentEncoding,
					blobContentType
				}
			});

			return blobPath;
		} catch (error) {
			console.log('File upload failed', error);
		}
	}

	async uploadFiles(files, options = {}) {
		const results = await Promise.allSettled(
			files.map(async (image) => await this.uploadFile(image, options))
		);

		return results.map((r) => r.value);
	}
}

module.exports = AzureStorageContainerDataSource;
