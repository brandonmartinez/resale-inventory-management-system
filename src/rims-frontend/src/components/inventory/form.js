import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
	DropDown,
	FileUpload,
	Form,
	Submit,
	TextArea,
	TextBox
} from '../shared/forms';
import { Prose } from '../shared/utilities';

const InventoryItemForm = ({ mutationEvent, inventoryItem = {} }) => {
	// State Variables
	//////////////////////////////////////////////////
	const history = useHistory();

	const [brand, setBrand] = useState(inventoryItem.brand || '');
	const [category, setCategory] = useState(inventoryItem.category || '');
	const [color, setColor] = useState(inventoryItem.color || '');
	const [condition, setCondition] = useState(inventoryItem.condition || '');
	const [cost, setCost] = useState(inventoryItem.cost || '');
	const [description, setDescription] = useState(
		inventoryItem.description || ''
	);
	const [existingImages, setExistingImages] = useState(
		inventoryItem.relativeImagePaths || []
	);
	const [imagesToUpload, setImagesToUpload] = useState([]);

	const [name, setName] = useState(inventoryItem.name || '');
	const [price, setPrice] = useState(inventoryItem.price || '');
	const [salePrice, setSalePrice] = useState(inventoryItem.salePrice || '');
	const [size, setSize] = useState(inventoryItem.size || '');
	const [style, setStyle] = useState(inventoryItem.style || '');
	const [tag1, setTag1] = useState(inventoryItem.tag1 || '');
	const [tag2, setTag2] = useState(inventoryItem.tag2 || '');
	const [tag3, setTag3] = useState(inventoryItem.tag3 || '');

	// Render
	//////////////////////////////////////////////////
	const title = inventoryItem.id
		? `Update Inventory Item ${inventoryItem.name}`
		: 'Add New Inventory Item';

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();

				// Build the item we're going to post
				const itemToSend = {
					name,
					description,
					hashtags: [tag1, tag2, tag3].join(', '),
					category,
					brand,
					condition,
					color,
					size,
					style,
					cost: parseFloat(cost),
					price: parseFloat(price),
					salePrice: parseFloat(salePrice)
				};
				if (inventoryItem.id) {
					itemToSend.id = inventoryItem.id;
				}

				mutationEvent(itemToSend, imagesToUpload);

				history.push('/inventory');
			}}
		>
			<Prose>
				<h1>{title}</h1>
			</Prose>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div>
					<FileUpload
						id='product-photos'
						label='Upload Photos'
						fileTypesMessage='JPG or PNG up to 10MB'
						accept='image/*'
						onDrop={(acceptedFiles) => {
							setImagesToUpload(
								imagesToUpload.concat(
									acceptedFiles.map((file) =>
										Object.assign(file, {
											preview: URL.createObjectURL(file)
										})
									)
								)
							);
						}}
					/>

					<h2>Images to Upload</h2>
					<aside className='flex flex-wrap w-full h-auto justify-center justify-items-center gap-4 mb-4'>
						{imagesToUpload.map((image) => (
							<div
								key={image.name}
								className='flex-none rounded-md bg-cover-image w-20 h-20'
								style={{ backgroundImage: 'url(' + image.preview + ')' }}
							>
								&nbsp;
							</div>
						))}
					</aside>
					<h2>Existing Images</h2>
					<aside className='flex flex-wrap w-full h-auto justify-center justify-items-center gap-4 mb-4'>
						{existingImages.map((image) => (
							<div
								key={image.name}
								className='flex-none rounded-md bg-cover-image w-40 h-40'
								style={{
									backgroundImage: `url(https://sarimsprodeusassets.blob.core.windows.net/inventoryitemimages/${image})`
								}}
							>
								&nbsp;
							</div>
						))}
					</aside>
					{/* TODO: remove hardcoded URL */}
				</div>
				<div className='md:col-span-2'>
					<TextBox
						id='name'
						label='Name'
						placeholder='Enter a descriptive item name.'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextArea
						id='description'
						label='Description'
						placeholder='Enter a detailed description of the item.'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<div className='flex flex-wrap gap-0 md:gap-x-4 justify w-full -my-4'>
						<TextBox
							id='tag1'
							containerClassName='flex-auto'
							label='Tag 1'
							placeholder='Item Tag'
							prefix='#'
							onChange={(e) => setTag1(e.target.value)}
						/>
						<TextBox
							id='tag2'
							containerClassName='flex-auto'
							label='Tag 2'
							placeholder='Item Tag'
							prefix='#'
							onChange={(e) => setTag2(e.target.value)}
						/>
						<TextBox
							id='tag3'
							containerClassName='flex-auto'
							label='Tag 3'
							placeholder='Item Tag'
							prefix='#'
							onChange={(e) => setTag3(e.target.value)}
						/>
					</div>
					<div className='flex flex-wrap gap-0 md:gap-x-4 justify w-full -my-4'>
						<TextBox
							id='category'
							containerClassName='flex-auto'
							label='Category'
							placeholder='Choose a category for this item.'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
						<TextBox
							id='brand'
							containerClassName='flex-auto'
							label='Brand'
							placeholder='The Brand of the Item'
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
						/>
					</div>
					<DropDown
						id='condition'
						label='Condition'
						placeholder='Condition of the Item'
						value={condition}
						onChange={(e) => setCondition(e.target.value)}
						items={[
							{ text: 'New', value: 'New' },
							{ text: 'Like New', value: 'LikeNew' },
							{ text: 'Good', value: 'Good' },
							{ text: 'Fair', value: 'Fair' },
							{ text: 'Poor', value: 'Poor' }
						]}
					/>
					<div className='flex flex-wrap gap-0 md:gap-x-4 justify w-full -my-4'>
						<TextBox
							id='color'
							containerClassName='flex-auto'
							label='Color'
							placeholder='The Color of the Item'
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
						<TextBox
							id='style'
							containerClassName='flex-auto'
							label='Style'
							placeholder='The Style of the Item'
							value={style}
							onChange={(e) => setStyle(e.target.value)}
						/>
						<TextBox
							id='size'
							containerClassName='flex-auto'
							label='Size'
							placeholder='The Size of the Item'
							value={size}
							onChange={(e) => setSize(e.target.value)}
						/>
					</div>
					<div className='flex flex-wrap gap-0 md:gap-x-4 justify w-full -my-4'>
						<TextBox
							id='cost'
							containerClassName='flex-auto'
							label='Purchase Cost'
							placeholder='0.00'
							prefix='$'
							value={cost}
							onChange={(e) => setCost(e.target.value)}
						/>
						<TextBox
							id='price'
							containerClassName='flex-auto'
							label='Listing Price'
							placeholder='0.00'
							prefix='$'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<TextBox
							id='price'
							containerClassName='flex-auto'
							label='Sale Price'
							placeholder='0.00'
							prefix='$'
							value={salePrice}
							onChange={(e) => setSalePrice(e.target.value)}
						/>
					</div>
					<Submit />
				</div>
			</div>
		</Form>
	);
};

export default InventoryItemForm;
