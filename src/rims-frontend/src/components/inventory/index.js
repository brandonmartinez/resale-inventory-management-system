import { Link } from 'react-router-dom';

import { gql } from '@apollo/client';

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
		filter: (p) => {
			if (p.length > 0) {
				return (
					<img
						src={
							'https://sarimsprodeusassets.blob.core.windows.net/inventoryitemimages/' +
							p[0]
						}
						style={{
							maxHeight: '4em',
							width: 'auto'
						}}
						alt='Product'
					/>
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
		<Link to='/inventory/add' as={Link}>
			Add New Item
		</Link>

		<DataTable
			gql={getAllInventoryItems}
			columns={columns}
			pathPrefix='/inventory/edit'
			orderByDefaultField='name'
		/>
	</>
);

export default Inventory;
