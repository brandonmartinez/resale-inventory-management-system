import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import {
	Link,
	useHistory
} from 'react-router-dom';

import {
	gql,
	useQuery
} from '@apollo/client';

const getAllInventoryItems = gql`
	query Query($orderBy: String) {
		getAllInventoryItems(orderBy: $orderBy) {
			id
			friendlyId
			name
			category
			brand
			condition
			cost
			price
			relativeImagePaths
		}
	}
`;

const Inventory = () => {
	const history = useHistory();

	const [orderBy, setOrderBy] = useState('name ASC');
	const { loading, error, data } = useQuery(getAllInventoryItems, {
		variables: {
			orderBy
		}
	});

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error :({error}</p>;
	}

	const setColumnOrdering = (previous, next) => {
		const [previousField, previousDirection] = previous.split(' ');
		const direction =
			previousField === next && previousDirection === 'ASC' ? 'DESC' : 'ASC';

		setOrderBy(`${next} ${direction}`);
	};

	return (
		<>
			<Row>
				<Col>
					<ButtonToolbar aria-label='Toolbar with button groups'>
						<ButtonGroup aria-label='Third group'>
							<Button to='/inventory/add' as={Link}>
								Add New Item
							</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</Col>
			</Row>
			<Row>
				<Col>
					<Table
						striped
						bordered
						hover
						responsive='md'
						className='align-middle'
					>
						<thead>
							<tr>
								<th>&nbsp;</th>
								<th onClick={() => setColumnOrdering(orderBy, 'name')}>Name</th>
								<th onClick={() => setColumnOrdering(orderBy, 'category')}>
									Category
								</th>
								<th onClick={() => setColumnOrdering(orderBy, 'brand')}>
									Brand
								</th>
								<th onClick={() => setColumnOrdering(orderBy, 'condition')}>
									Condition
								</th>
								<th onClick={() => setColumnOrdering(orderBy, 'cost')}>Cost</th>
								<th onClick={() => setColumnOrdering(orderBy, 'price')}>
									Price
								</th>
							</tr>
						</thead>
						<tbody>
							{data.getAllInventoryItems.map((inventoryItem, i) => (
								<tr
									key={`product-image-${i}`}
									onClick={() =>
										history.push(`/inventory/edit/${inventoryItem.id}`)
									}
								>
									<td className='text-center'>
										{inventoryItem.relativeImagePaths &&
										inventoryItem.relativeImagePaths.length > 0 ? (
											<img
												src={
													'https://sarimsprodeusassets.blob.core.windows.net/inventoryitemimages/' +
													inventoryItem.relativeImagePaths[0]
												}
												style={{
													maxHeight: '4em',
													width: 'auto'
												}}
												alt='Product'
											/>
										) : (
											<></>
										)}
									</td>
									<td>{inventoryItem.name}</td>
									<td>{inventoryItem.category}</td>
									<td>{inventoryItem.brand}</td>
									<td>{inventoryItem.condition}</td>
									<td>${(inventoryItem.cost || 0).toFixed(2)}</td>
									<td>${(inventoryItem.price || 0).toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</>
	);
};

export default Inventory;
