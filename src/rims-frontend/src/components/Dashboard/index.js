import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
	gql,
	useQuery
} from '@apollo/client';

const getLatestInventoryItems = gql`
	query Query {
		getLatestInventoryItems(numberOfItems: 1) {
			name
			id
		}
	}
`;

const Dashboard = () => {
	const { loading, error, data } = useQuery(getLatestInventoryItems);
	console.log(data);

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error :({error}</p>;
	}

	return (
		<Row>
			<Col>
				Latest Items:
				<ul>
					{data.getLatestInventoryItems.map((item) => (
						<li key={`item-${item.id}`}>{item.name}</li>
					))}
				</ul>
			</Col>
			<Col>Dashboard</Col>
			<Col>Content</Col>
		</Row>
	);
};

export default Dashboard;
