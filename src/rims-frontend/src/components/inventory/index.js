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
			friendlyId
			name
			category
		}
	}
`;

const Inventory = () => {
	const { loading, error, data } = useQuery(getAllInventoryItems);
	console.log(data);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :({error}</p>;

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
								<th>#</th>
								<th>Name</th>
								<th>Category</th>
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							{data.getAllInventoryItems.map((inventoryItem) => (
								<tr>
									<td>{inventoryItem.friendlyId}</td>
									<td>{inventoryItem.name}</td>
									<td>{inventoryItem.category}</td>
									<td>
										<ButtonToolbar>
											<ButtonGroup className='me-2' aria-label='Actions'>
												<Button variant='primary'>View</Button>
												<Button variant='primary'>Edit</Button>
											</ButtonGroup>
											<ButtonGroup aria-label='Actions'>
												<Button variant='danger'>Delete</Button>
											</ButtonGroup>
										</ButtonToolbar>
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
