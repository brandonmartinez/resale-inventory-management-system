import {
	gql,
	useMutation,
	useQuery
} from '@apollo/client';

import InventoryItemForm from './form';

const updateInventoryItemMutation = gql`
	mutation UpdateInventoryItemMutation(
		$inventoryItem: InventoryItemInput!
		$images: [Upload!]
	) {
		updateInventoryItem(inventoryItem: $inventoryItem, images: $images) {
			id
		}
	}
`;

const getInventoryItem = gql`
	query GetInventoryItemById($inventoryId: ID!) {
		getInventoryItemById(id: $inventoryId) {
			brand
			category
			color
			condition
			cost
			description
			friendlyId
			hashtags
			name
			price
			relativeImagePaths
			salePrice
			size
			style
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
		updateInventoryItem,
		{ loading: mutationLoading, error: mutationError }
	] = useMutation(updateInventoryItemMutation);

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
			mutationEvent={(inventoryItem, images) =>
				updateInventoryItem({
					variables: {
						inventoryItem,
						images
					}
				})
			}
			clearAfterSubmit={false}
			inventoryItem={inventoryItem}
		/>
	);
};

export default UpdateInventoryItem;
