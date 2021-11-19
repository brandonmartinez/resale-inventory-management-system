import { gql } from '@apollo/client';
import { PlusIcon } from '@heroicons/react/solid';

import { Button } from '../shared/forms';
import { DataTable } from '../shared/tables';

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

const columns = [
	{
		key: 'relativeImagePaths',
		label: '',
		className: 'text-center',
		noSort: true,
		filter: (p) => {
			if (p.length > 0) {
				return (
					<div
						className='flex-none mx-auto rounded-md bg-cover-image w-10 h-10 group'
						style={{
							backgroundImage:
								'url(https://sarimsprodeusassets.blob.core.windows.net/inventoryitemimages/' +
								p[0] +
								')'
						}}
					>
						&nbsp;
					</div>
				);
			}
			return <></>;
		}
	},
	{ key: 'name', label: 'Name' },
	{ key: 'category', label: 'category' },
	{ key: 'brand', label: 'brand' },
	{ key: 'condition', label: 'condition' },
	{
		key: 'cost',
		label: 'cost',
		className: 'text-right',
		filter: (p) => '$' + (p || 0).toFixed(2)
	},
	{
		key: 'price',
		label: 'price',
		className: 'text-right',
		filter: (p) => '$' + (p || 0).toFixed(2)
	}
];

const Inventory = () => (
	<>
		<Button to='/inventory/add' Icon={PlusIcon}>
			Add New Item
		</Button>

		<DataTable
			gql={getAllInventoryItems}
			columns={columns}
			pathPrefix='/inventory/edit'
			orderByDefaultField='name'
		/>
	</>
);

export default Inventory;
