import {
	gql,
	useMutation,
	useQuery
} from '@apollo/client';

import InventoryItemForm from './form';

const createInventoryItemMutation = gql`
	mutation CreateInventoryItemMutation(
		$createInventoryItemInput: InventoryItemInput!
	) {
		createInventoryItem(inventoryItem: $createInventoryItemInput) {
			id
		}
	}
`;

const getInventoryItem = gql`
	query ExampleQuery($inventoryId: ID!) {
		getInventoryItemById(id: $inventoryId) {
			friendlyId
			name
			description
			hashtags
			category
			brand
			condition
			color
			style
			price
			cost
		}
	}
`;

const UpdateInventoryItem = ({ id }) => {
	// GraphQL Hooks
	//////////////////////////////////////////////////
	const {
		loading: queryLoading,
		error: queryError,
		data
	} = useQuery(getInventoryItem, {
		variables: {
			inventoryId: id
		}
	});

	const [
		createInventoryItem,
		{ loading: mutationLoading, error: mutationError }
	] = useMutation(createInventoryItemMutation);

	if (queryLoading) {
		return 'Loading...';
	}
	if (queryError) {
		return `Query error! ${queryError.message}`;
	}
	if (mutationLoading) {
		return 'Submitting...';
	}
	if (mutationError) {
		return `Submission error! ${mutationError.message}`;
	}

	// Sanitize
	//////////////////////////////////////////////////
	const inventoryItem = {
		id,
		...data.getInventoryItemById
	};

	// Render
	//////////////////////////////////////////////////
	return (
		<InventoryItemForm
			mutationEvent={(inventoryItem) =>
				createInventoryItem({
					variables: {
						createInventoryItemInput: inventoryItem
					}
				})
			}
			clearAfterSubmit={false}
			inventoryItem={inventoryItem}
		/>
	);
};

export default UpdateInventoryItem;
