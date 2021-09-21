import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import {
	gql,
	useQuery
} from '@apollo/client';

const getInventoryItems = gql`
	query Query {
		getAllInventory {
			friendlyId
			name
			category
		}
	}
`;

const Inventory = () => {
	const { loading, error, data } = useQuery(getInventoryItems);
	console.log(data);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :({error}</p>;

	return (
		<>
			<Row>
				<Col>
					<ButtonToolbar aria-label='Toolbar with button groups'>
						<ButtonGroup className='me-2' aria-label='First group'>
							<Button>1</Button> <Button>2</Button> <Button>3</Button>{' '}
							<Button>4</Button>
							<DropdownButton
								as={ButtonGroup}
								title='Dropdown'
								id='bg-nested-dropdown'
							>
								<Dropdown.Item eventKey='1'>Dropdown link</Dropdown.Item>
								<Dropdown.Item eventKey='2'>Dropdown link</Dropdown.Item>
							</DropdownButton>
						</ButtonGroup>
						<ButtonGroup className='me-2' aria-label='Second group'>
							<Button>5</Button> <Button>6</Button> <Button>7</Button>
						</ButtonGroup>
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
								<th>#</th>
								<th>Category</th>
								<th>Space</th>
								<th>Name</th>
								<th>Description</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.getAllInventory.map((inventoryItem) => (
								<tr>
									<td>
										<img
											height='100'
											src='https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F40%2Fcf%2F40cf42a76cf1f0ee44baa98d75acc836ef9d85d5.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_jeans_slim%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]'
										/>
									</td>
									<td>{inventoryItem.friendlyId}</td>
									<td>Jeans</td>
									<td>Tub 001</td>
									<td>Women's Silver Jeans</td>
									<td>Size 0</td>
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
