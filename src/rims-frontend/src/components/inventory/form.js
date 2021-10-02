import {
	useEffect,
	useState
} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';

import {
	DropDown,
	FileUpload,
	Submit,
	TextArea,
	TextBox
} from '../shared/forms';

const InventoryItemForm = ({
	mutationEvent,
	inventoryItem = {},
	clearAfterSubmit
}) => {
	// State Variables
	//////////////////////////////////////////////////
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
	const [images, setImages] = useState([]);
	const [name, setName] = useState(inventoryItem.name || '');
	const [price, setPrice] = useState(inventoryItem.price || '');
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

	// Helper Functions
	//////////////////////////////////////////////////
	const clearFields = () => {
		setBrand('');
		setCategory('');
		setColor('');
		setCondition('');
		setCost('');
		setDescription('');
		setExistingImages([]);
		setName('');
		setPrice('');
		setStyle('');
		setTag1('');
		setTag2('');
		setTag3('');
	};

	// Render
	//////////////////////////////////////////////////
	const title = inventoryItem.id
		? `Update Inventory Item #${inventoryItem.friendlyId}`
		: 'Add New Inventory Item';
	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();

				// Build the item we're going to post
				const itemToSend = {
					name: name,
					description: description,
					hashtags: [tag1, tag2, tag3].join(', '),
					category: category,
					brand: brand,
					condition: condition,
					color: color,
					style: style,
					cost: parseFloat(cost),
					price: parseFloat(price)
				};
				if (inventoryItem.id) {
					itemToSend.id = inventoryItem.id;
				}

				mutationEvent(itemToSend, images);

				if (clearAfterSubmit) {
					clearFields();
				}
			}}
		>
			<Row>
				<Col>
					<h1>{title}</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<FileUpload
						id='images'
						label='Item Images'
						multiple
						onChange={(e) => setImages(e.target.files)}
					/>
					{/* TODO: remove hardcoded URL */}
					{existingImages.map((i) => (
						<img
							key={'existing-image-' + i}
							alt='product'
							width="100"
							height="auto"
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
