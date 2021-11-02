import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import {
	classNames,
	Loading
} from './utilities';

export const TH = ({ children, ...rest }) => (
	<th
		scope='col'
		className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
		{...rest}
	>
		{children}
	</th>
);
export const TD = ({ className, children, ...rest }) => (
	<td
		className={classNames(
			'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
			className
		)}
		{...rest}
	>
		{children}
	</td>
);

export const Table = ({ children, ...rest }) => (
	<div className='flex flex-col'>
		<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
			<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
				<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
					<table className='min-w-full divide-y divide-gray-200' {...rest}>
						{children}
					</table>
				</div>
			</div>
		</div>
	</div>
);

export const DataTable = ({
	gql,
	columns,
	pathPrefix,
	orderByDefaultField
}) => {
	const history = useHistory();
	const [orderBy, setOrderBy] = useState(`${orderByDefaultField} ASC`);
	const { loading, error, data } = useQuery(gql, {
		variables: {
			orderBy
		}
	});

	if (loading) {
		return <Loading />;
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

	const values = Object.values(data)[0];

	return (
		<Table>
			<thead className='bg-gray-50'>
				<tr>
					{columns.map((column) => (
						<TH
							onClick={
								column.noSort
									? () => false
									: () => setColumnOrdering(orderBy, column.key)
							}
						>
							{column.label}
						</TH>
					))}
				</tr>
			</thead>
			<tbody className='bg-white divide-y divide-gray-200'>
				{values.map((value, i) => (
					<tr
						key={`data-table-record-${i}`}
						onClick={() => history.push(`${pathPrefix}/${value.id}`)}
					>
						{columns.map((column) => (
							<TD className={column.className}>
								{column.filter && value[column.key]
									? column.filter(value[column.key])
									: value[column.key]}
							</TD>
						))}
					</tr>
				))}
			</tbody>
		</Table>
	);
};
