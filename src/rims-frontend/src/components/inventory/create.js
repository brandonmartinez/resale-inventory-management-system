import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {
	DropDown,
	Submit,
	TextArea,
	TextBox
} from '../shared/forms';

const CreateInventoryItem = () => {
	return (
		<Form>
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
					/>
					<TextArea
						id='description'
						label='Description'
						placeholder='Enter a detailed description of the item.'
					/>
					<Row>
						<Col>
							<TextBox id='tag1' label='Tag 1' placeholder='Item Tag' />
						</Col>
						<Col>
							<TextBox id='tag2' label='Tag 2' placeholder='Item Tag' />
						</Col>
						<Col>
							<TextBox id='tag3' label='Tag 3' placeholder='Item Tag' />
						</Col>
					</Row>
					<TextBox
						id='category'
						label='Category'
						placeholder='Choose a category for this item.'
					/>
					<TextBox
						id='brand'
						label='Brand'
						placeholder='The Brand of the Item'
					/>
					<DropDown
						id='condition'
						label='Condition'
						placeholder='Condition of the Item'
						items={[
							{ text: 'New', value: 'new' },
							{ text: 'Like New', value: 'likenew' },
							{ text: 'Good', value: 'good' },
							{ text: 'Fair', value: 'fair' },
							{ text: 'Poor', value: 'poor' }
						]}
					/>
					<TextBox
						id='color'
						label='Color'
						placeholder='The Color of the Item'
					/>
					<TextBox
						id='style'
						label='Style'
						placeholder='The Style of the Item'
					/>
					<TextBox
						id='cost'
						label='Purchase Cost'
						placeholder='The Original Purchase Cost of the Item'
					/>
					<TextBox
						id='price'
						label='Listing Price'
						placeholder='The Listing Price of the Item'
					/>
					<Submit />
				</Col>
			</Row>
		</Form>
	);
};

export default CreateInventoryItem;
