// More info: https://react-dropzone.js.org
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';

import { SearchIcon } from '@heroicons/react/solid';

import { classNames } from './utilities';

export const Form = ({ children, ...rest }) => (
	<div className='mt-5 md:mt-0 md:col-span-2'>
		<form {...rest}>{children}</form>
	</div>
);

export const InputContainer = ({ children }) => (
	<div className='block mx-2 md:mx-0 my-4'>{children}</div>
);

export const Label = ({ id, label }) => (
	<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
		{label}
	</label>
);

export const InputDescription = ({ description }) => (
	<p className='text-sm text-gray-500 mt-2 sm:my-3'>{description}</p>
);

export const TextBox = ({ id, label, placeholder, ...rest }) => (
	<InputContainer>
		<Label id={id} label={label} />
		<input
			type='text'
			name={id}
			id={id}
			placeholder={placeholder}
			className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
			{...rest}
		/>
	</InputContainer>
);

export const SearchBox = ({
	id = 'search',
	label = 'Search',
	placeholder = 'Search…',
	...rest
}) => (
	<div className='relative mx-auto text-gray-600 w-auto'>
		<input
			className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:w-full'
			type='search'
			name={id}
			id={id}
			placeholder={placeholder}
			{...rest}
		/>
		<button type='submit' className='absolute right-0 top-0 mt-3 mr-4'>
			<SearchIcon className='float-right align-base h-4 w-4 mr-1 text-gray-700' />
		</button>
	</div>
);

export const TextArea = ({
	id,
	label,
	placeholder,
	rows = 3,
	description,
	...rest
}) => (
	<InputContainer>
		<Label id={id} label={label} />
		<div className='mt-1'>
			<textarea
				id={id}
				name={id}
				rows={rows}
				className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
				placeholder={placeholder}
				{...rest}
			/>
		</div>
		{description ? <InputDescription description={description} /> : null}
	</InputContainer>
);

export const DropDown = ({
	id,
	label,
	placeholder,
	items,
	includeEmpty = true,
	...rest
}) => (
	<InputContainer>
		<Label id={id} label={label} />
		<select
			id={id}
			name={id}
			className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
		>
			{includeEmpty ? <option></option> : null}
			{items.map((item, i) => (
				<option key={`${id}-${i}`} value={item.value || item.text}>
					{item.text}
				</option>
			))}
		</select>
	</InputContainer>
);

export const FileUpload = ({
	id,
	label,
	fileTypesMessage = 'Any file up to 10MB',
	accept = '*/*',
	onDrop
}) => {
	const { getRootProps, getInputProps } = useDropzone({
		accept,
		onDrop
	});

	return (
		<InputContainer>
			<Label id={id} label={label} />
			<div
				{...getRootProps({
					className:
						'mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500'
				})}
			>
				<div className='space-y-1 text-center'>
					<svg
						className='mx-auto h-12 w-12 text-gray-400'
						stroke='currentColor'
						fill='none'
						viewBox='0 0 48 48'
						aria-hidden='true'
					>
						<path
							d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
							strokeWidth={2}
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					<div className='flex text-sm text-gray-600'>
						<label
							htmlFor='file-upload'
							className='relative cursor-pointer rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
						>
							<span>Upload a file</span>
							<input id={id} {...getInputProps({ className: 'sr-only' })} />
						</label>
						<p className='pl-1'>or drag and drop</p>
					</div>
					<p className='text-xs text-gray-500'>{fileTypesMessage}</p>
				</div>
			</div>
		</InputContainer>
	);
};

export const Submit = ({ label = 'Submit', ...rest }) => (
	<InputContainer>
		<button
			type='submit'
			className='inline-flex float-right justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
			{...rest}
		>
			{label}
		</button>
	</InputContainer>
);

export const Button = ({ to, className, children, ...rest }) => (
	<InputContainer>
		<Link
			to={to}
			className={classNames(
				'inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
				className
			)}
			{...rest}
		>
			{children}
		</Link>
	</InputContainer>
);
