import {
	gql,
	useMutation
} from '@apollo/client';

import InventoryItemForm from './form';

// FROM: https://www.apollographql.com/docs/react/data/mutations/
const createInventoryItemMutation = gql`
	mutation CreateInventoryItemMutation(
		$createInventoryItemInput: InventoryItemInput!
	) {
		createInventoryItem(inventoryItem: $createInventoryItemInput) {
			id
		}
	}
`;

const CreateInventoryItem = () => {
	// GraphQL Hooks
	//////////////////////////////////////////////////
	const [createInventoryItem, { loading, error }] = useMutation(
		createInventoryItemMutation
	);

	if (loading) {
		return 'Submitting...';
	}
	if (error) {
		return `Submission error! ${error.message}`;
	}

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
		/>
	);
};

export default CreateInventoryItem;
