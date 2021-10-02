const Jimp = require('jimp');

module.exports = async function (context, inputBlob) {
	const image = await Jimp.read(inputBlob);

	const width = image.getWidth();
	const height = image.getHeight();
	const idealMaxLength = 2000;
	const maxLength =
		// if any of the sides are larger than the ideal max, then use ideal max
		width > idealMaxLength || height > idealMaxLength
			? idealMaxLength
			: // otherwise, if the width is larger than the height, use that, otherwise use height
			width > height
			? width
			: height;

	// Operate on the image
	image.scaleToFit(maxLength, maxLength).quality(70);
	// Save Out
	const imageData = await image.getBufferAsync(Jimp.MIME_JPEG);
	context.log(
		'Node.JS blob trigger function resized ' +
			context.bindingData.name +
			' to ' +
			image.bitmap.width +
			'x' +
			image.bitmap.height
	);

	// Setup a queue message to notify the queue trigger we're ready to cleanup the blob from uploads
	const messageData = context.bindingData.name + '.jpg';
	context.bindings.cleanupQueue = messageData;

	return imageData;
};
