import { useState } from 'react';

import {
	Link,
	useHistory
} from 'react-router-dom';

import {
	gql,
	useQuery
} from '@apollo/client';

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

const Inventory = () => {
	const history = useHistory();

	const [orderBy, setOrderBy] = useState('name ASC');
	const { loading, error, data } = useQuery(getAllInventoryItems, {
		variables: {
			orderBy
		}
	});

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error :({error}</p>;
	}

	const setColumnOrdering = (previous, next) => {
		const [previousField, previousDirection] = previous.split(' ');
		const direction =
			previousField === next && previousDirection === 'ASC' ? 'DESC' : 'ASC';

		setOrderBy(`${next} ${direction}`);
	};

	const HeaderColumn = ({ children, ...rest }) => <th scope="col"
		className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...rest}>{children}</th>;
	const DataColumn = ({ children, ...rest }) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...rest}>{children}</td>

	return (
		<>
			<Link to='/inventory/add' as={Link}>
				Add New Item
			</Link>
			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<HeaderColumn>&nbsp;</HeaderColumn>
										<HeaderColumn onClick={() => setColumnOrdering(orderBy, 'name')}>Name</HeaderColumn>
										<HeaderColumn onClick={() => setColumnOrdering(orderBy, 'category')}>
											Category
										</HeaderColumn>
										<HeaderColumn onClick={() => setColumnOrdering(orderBy, 'brand')}>
											Brand
										</HeaderColumn>
										<HeaderColumn onClick={() => setColumnOrdering(orderBy, 'condition')}>
											Condition
										</HeaderColumn>
										<HeaderColumn onClick={() => setColumnOrdering(orderBy, 'cost')}>Cost</HeaderColumn>
										<HeaderColumn onClick={() => setColumnOrdering(orderBy, 'price')}>
											Price
										</HeaderColumn>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data.getAllInventoryItems.map((inventoryItem, i) => (
										<tr key={`inventory-item-${i}`} onClick={() => history.push(`/inventory/edit/${inventoryItem.id}`)}>
											<DataColumn className='text-center'>
												{inventoryItem.relativeImagePaths &&
													inventoryItem.relativeImagePaths.length > 0 ? (
													<img
														src={
															'https://sarimsprodeusassets.blob.core.windows.net/inventoryitemimages/' +
															inventoryItem.relativeImagePaths[0]
														}
														style={{
															maxHeight: '4em',
															width: 'auto'
														}}
														alt='Product'
													/>
												) : (
													<></>
												)}
											</DataColumn>
											<DataColumn>{inventoryItem.name}</DataColumn>
											<DataColumn>{inventoryItem.category}</DataColumn>
											<DataColumn>{inventoryItem.brand}</DataColumn>
											<DataColumn>{inventoryItem.condition}</DataColumn>
											<DataColumn>${(inventoryItem.cost || 0).toFixed(2)}</DataColumn>
											<DataColumn>${(inventoryItem.price || 0).toFixed(2)}</DataColumn>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Inventory;
