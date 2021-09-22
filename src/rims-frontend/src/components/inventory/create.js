import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {
	gql,
	useMutation
} from '@apollo/client';

import {
	DropDown,
	Submit,
	TextArea,
	TextBox
} from '../shared/forms';

// FROM: https://www.apollographql.com/docs/react/data/mutations/
const createInventoryItemMutation = gql`
	mutation CreateInventoryItemMutation(
		$createInventoryItemInput: InventoryItemInput!
	) {
		createInventoryItem(inventoryItem: $createInventoryItemInput) {
			id
		}
	}
`;

const CreateInventoryItem = () => {
	const [name, setName] = useState('test');
	const [description, setDescription] = useState('');
	const [tag1, setTag1] = useState('');
	const [tag2, setTag2] = useState('');
	const [tag3, setTag3] = useState('');
	const [category, setCategory] = useState('');
	const [brand, setBrand] = useState('');
	const [condition, setCondition] = useState('');
	const [color, setColor] = useState('');
	const [style, setStyle] = useState('');
	const [cost, setCost] = useState('');
	const [price, setPrice] = useState('');

	const [createInventoryItem, { data, loading, error }] = useMutation(
		createInventoryItemMutation
	);

	if (loading) return 'Submitting...';
	if (error) return `Submission error! ${error.message}`;
	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				createInventoryItem({
					variables: {
						createInventoryItemInput: {
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
						}
					}
				});
				setName('');
				setDescription('');
				setTag1('');
				setTag2('');
				setTag3('');
				setCategory('');
				setBrand('');
				setCondition('');
				setColor('');
				setStyle('');
				setCost('');
				setPrice('');
			}}
		>
			<Row>
				<Col>
					<h1>Add New Inventory Item</h1>
				</Col>
			</Row>
			<Row>
				<Col>Image upload</Col>
				<Col>
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
						onChange={(e) => setCategory(e.target.value)}
					/>
					<TextBox
						id='brand'
						label='Brand'
						placeholder='The Brand of the Item'
						onChange={(e) => setBrand(e.target.value)}
					/>
					<DropDown
						id='condition'
						label='Condition'
						placeholder='Condition of the Item'
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
						onChange={(e) => setColor(e.target.value)}
					/>
					<TextBox
						id='style'
						label='Style'
						placeholder='The Style of the Item'
						onChange={(e) => setStyle(e.target.value)}
					/>
					<TextBox
						id='cost'
						label='Purchase Cost'
						placeholder='The Original Purchase Cost of the Item'
						onChange={(e) => setCost(e.target.value)}
					/>
					<TextBox
						id='price'
						label='Listing Price'
						placeholder='The Listing Price of the Item'
						onChange={(e) => setPrice(e.target.value)}
					/>
					<Submit />
				</Col>
			</Row>
		</Form>
	);
};

export default CreateInventoryItem;
