import {
	useEffect,
	useState
} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
// More info: https://react-dropzone.js.org
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';

import {
	DropDown,
	Submit,
	TextArea,
	TextBox
} from '../shared/forms';

const InventoryItemForm = ({
	mutationEvent,
	inventoryItem = {}
}) => {
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
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			setImagesToUpload(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file)
					})
				)
			);
		}
	});
	const [name, setName] = useState(inventoryItem.name || '');
	const [price, setPrice] = useState(inventoryItem.price || '');
	const [size, setSize] = useState(inventoryItem.size || '');
	const [style, setStyle] = useState(inventoryItem.style || '');
	const [suggestedName, setSuggestedName] = useState(
		inventoryItem.suggestedName || ''
	);
	const [tag1, setTag1] = useState(inventoryItem.tag1 || '');
	const [tag2, setTag2] = useState(inventoryItem.tag2 || '');
	const [tag3, setTag3] = useState(inventoryItem.tag3 || '');

	// Effect Hooks
	//////////////////////////////////////////////////
	useEffect(() => {
		const suggestedNameParts = [condition, brand, color, style, category];
		const suggestName = suggestedNameParts.filter((n) => n).join(' ');

		setSuggestedName(suggestName);
	}, [suggestedName, condition, brand, color, style, category]);

	// Styles
	//////////////////////////////////////////////////
	const thumbsContainer = {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 16
	};

	const thumb = {
		display: 'inline-flex',
		borderRadius: 2,
		border: '1px solid #eaeaea',
		marginBottom: 8,
		marginRight: 8,
		width: 100,
		height: 100,
		padding: 4,
		boxSizing: 'border-box'
	};

	const thumbInner = {
		display: 'flex',
		minWidth: 0,
		overflow: 'hidden'
	};

	const img = {
		display: 'block',
		width: 'auto',
		height: '100%'
	};

	// Render
	//////////////////////////////////////////////////
	const title = inventoryItem.id
		? `Update Inventory Item #${inventoryItem.friendlyId}`
		: 'Add New Inventory Item';
	const thumbs = imagesToUpload.map((image) => (
		<div style={thumb} key={image.name}>
			<div style={thumbInner}>
				<img src={image.preview} style={img} alt='File to Upload' />
			</div>
		</div>
	));
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
					price: parseFloat(price)
				};
				if (inventoryItem.id) {
					itemToSend.id = inventoryItem.id;
				}

				mutationEvent(itemToSend, imagesToUpload);

				history.push('/inventory');
			}}
		>
			<Row>
				<Col>
					<h1>{title}</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<div {...getRootProps({ className: 'dropzone' })}>
						<input {...getInputProps()} />
						<p>Drag 'n' drop some files here, or click to select files</p>
					</div>
					<aside style={thumbsContainer}>{thumbs}</aside>
					{/* TODO: remove hardcoded URL */}
					{existingImages.map((i) => (
						<img
							key={'existing-image-' + i}
							alt='product'
							width='100'
							height='auto'
							src={`https://sarimsprodeusassets.blob.core.windows.net/inventoryitemimages/${i}`}
						/>
					))}
				</Col>
				<Col>
					<TextBox
						id='name'
						label='Name'
						placeholder='Enter a descriptive item name.'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<FormLabel
						size='sm'
						onClick={(e) => setName(suggestedName)}
						style={{ display: suggestedName ? 'block' : 'none' }}
					>
						Suggested Name: {suggestedName}
					</FormLabel>
					<TextArea
						id='description'
						label='Description'
						placeholder='Enter a detailed description of the item.'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Row>
						<Col>
							<TextBox
								id='tag1'
								label='Tag 1'
								placeholder='Item Tag'
								onChange={(e) => setTag1(e.target.value)}
							/>
						</Col>
						<Col>
							<TextBox
								id='tag2'
								label='Tag 2'
								placeholder='Item Tag'
								onChange={(e) => setTag2(e.target.value)}
							/>
						</Col>
						<Col>
							<TextBox
								id='tag3'
								label='Tag 3'
								placeholder='Item Tag'
								onChange={(e) => setTag3(e.target.value)}
							/>
						</Col>
					</Row>
					<TextBox
						id='category'
						label='Category'
						placeholder='Choose a category for this item.'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>
					<TextBox
						id='brand'
						label='Brand'
						placeholder='The Brand of the Item'
						value={brand}
						onChange={(e) => setBrand(e.target.value)}
					/>
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
					<TextBox
						id='color'
						label='Color'
						placeholder='The Color of the Item'
						value={color}
						onChange={(e) => setColor(e.target.value)}
					/>
					<TextBox
						id='style'
						label='Style'
						placeholder='The Style of the Item'
						value={style}
						onChange={(e) => setStyle(e.target.value)}
					/>
					<TextBox
						id='size'
						label='Size'
						placeholder='The Size of the Item'
						value={size}
						onChange={(e) => setSize(e.target.value)}
					/>
					<TextBox
						id='cost'
						label='Purchase Cost'
						placeholder='The Original Purchase Cost of the Item'
						value={cost}
						onChange={(e) => setCost(e.target.value)}
					/>
					<TextBox
						id='price'
						label='Listing Price'
						placeholder='The Listing Price of the Item'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<Submit />
				</Col>
			</Row>
		</Form>
	);
};

export default InventoryItemForm;
