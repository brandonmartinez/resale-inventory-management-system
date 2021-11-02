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

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error :({error}</p>;
	}

	return (
		<div>
			Latest Items:
			<ul>
				{data.getLatestInventoryItems.map((item) => (
					<li key={`item-${item.id}`}>{item.name}</li>
				))}
			</ul>
		</div>
	);
};

export default Dashboard;
