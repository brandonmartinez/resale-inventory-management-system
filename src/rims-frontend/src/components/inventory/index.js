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
	query Query {
		getAllInventoryItems {
			id
			friendlyId
			name
			category
			brand
			condition
			cost
			price
		}
	}
`;

const Inventory = () => {
	const { loading, error, data } = useQuery(getAllInventoryItems);

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
								<th>Name</th>
								<th>Category</th>
								<th>Brand</th>
								<th>Condition</th>
								<th>Cost</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{data.getAllInventoryItems.map((inventoryItem) => (
								<tr>
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
