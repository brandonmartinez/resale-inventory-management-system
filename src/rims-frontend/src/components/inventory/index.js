import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

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
	const [orderBy, setOrderBy] = useState('name');
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
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>&nbsp;</th>
								<th onClick={() => setOrderBy('name')}>Name</th>
								<th onClick={() => setOrderBy('category')}>Category</th>
								<th onClick={() => setOrderBy('brand')}>Brand</th>
								<th onClick={() => setOrderBy('condition')}>Condition</th>
								<th onClick={() => setOrderBy('cost')}>Cost</th>
								<th onClick={() => setOrderBy('price')}>Price</th>
							</tr>
						</thead>
						<tbody>
							{data.getAllInventoryItems.map((inventoryItem, i) => (
								<tr key={`product-image-${i}`}>
									<td>
										{inventoryItem.relativeImagePaths &&
										inventoryItem.relativeImagePaths.length > 0 ? (
											<Link to={`/inventory/edit/${inventoryItem.id}`}>
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
											</Link>
										) : (
											<></>
										)}
									</td>
									<td>
										<Link to={`/inventory/edit/${inventoryItem.id}`}>
											{inventoryItem.name}
										</Link>
									</td>
									<td>
										<Link to={`/inventory/edit/${inventoryItem.id}`}>
											{inventoryItem.category}
										</Link>
									</td>
									<td>
										<Link to={`/inventory/edit/${inventoryItem.id}`}>
											{inventoryItem.brand}
										</Link>
									</td>
									<td>
										<Link to={`/inventory/edit/${inventoryItem.id}`}>
											{inventoryItem.condition}
										</Link>
									</td>
									<td>
										<Link to={`/inventory/edit/${inventoryItem.id}`}>
											${(inventoryItem.cost || 0).toFixed(2)}
										</Link>
									</td>
									<td>
										<Link to={`/inventory/edit/${inventoryItem.id}`}>
											${(inventoryItem.price || 0).toFixed(2)}
										</Link>
									</td>
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
