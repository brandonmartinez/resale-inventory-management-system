import React, { Fragment } from 'react';

import {
	Link,
	NavLink
} from 'react-router-dom';

// Library Imports
import {
	Disclosure,
	Menu,
	Transition
} from '@headlessui/react';
import {
	BellIcon,
	MenuIcon,
	XIcon
} from '@heroicons/react/outline';

import {
	Form,
	SearchBox
} from '../shared/forms';
import { classNames } from '../shared/utilities';

const navigation = [
	{ name: 'Inventory', href: '/inventory' },
	{ name: 'Labels', href: '/labels' },
	{ name: 'Spaces', href: '/spaces' }
];

const MenuButton = ({ open }) => (
	<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
		{/* Mobile menu button*/}
		<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
			<span className='sr-only'>Open main menu</span>
			{open ? (
				<XIcon className='block h-6 w-6' aria-hidden='true' />
			) : (
				<MenuIcon className='block h-6 w-6' aria-hidden='true' />
			)}
		</Disclosure.Button>
	</div>
);

const MobileNavigation = () => (
	<Disclosure.Panel className='sm:hidden'>
		<div className='px-2 pt-2 pb-3 space-y-1'>
			{navigation.map((item) => (
				<Disclosure.Button
					key={item.name}
					as='a'
					href={item.href}
					className={classNames(
						item.current
							? 'bg-gray-900 text-white'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white',
						'block px-3 py-2 rounded-md text-base font-medium'
					)}
					aria-current={item.current ? 'page' : undefined}
				>
					{item.name}
				</Disclosure.Button>
			))}
		</div>
	</Disclosure.Panel>
);

const DesktopNavigation = () => (
	<div className='hidden sm:block sm:ml-6'>
		<div className='flex space-x-4'>
			{navigation.map((item) => (
				<NavLink
					key={item.name}
					to={item.href}
					className={classNames(
						'text-gray-300 hover:bg-gray-700 hover:text-white',
						'px-3 py-2 rounded-md text-sm font-medium'
					)}
					activeClassName={classNames('bg-gray-900 text-white')}
					aria-current='page'
				>
					{item.name}
				</NavLink>
			))}
		</div>
	</div>
);

const SearchBar = () => (
	<div className='hidden sm:block sm:ml-6'>
		<Form>
			<SearchBox id='search' label='Search' placeholder='Search…' />
		</Form>
	</div>
);

const Logo = () => (
	<div className='flex-shrink-0 flex items-center'>
		<Link to='/' className='block h-10 w-auto'>
			<object
				type='image/svg+xml'
				data={process.env.PUBLIC_URL + '/thrift-and-shift-logo.svg'}
				alt='Thrift &amp; Shift Logo'
				title='Thrift &amp; Shift - Your Place to Manage Your Thrifting Finds'
				className='h-10 w-auto'
			></object>
		</Link>
	</div>
);

const NotificationButton = () => (
	<button
		type='button'
		className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
	>
		<span className='sr-only'>View notifications</span>
		<BellIcon className='h-6 w-6' aria-hidden='true' />
	</button>
);

const UserProfileMenu = () => (
	<Menu as='div' className='ml-3 relative'>
		<div>
			<Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
				<span className='sr-only'>Open user menu</span>
				<img
					className='h-8 w-8 rounded-full'
					src='https://scontent-ort2-1.xx.fbcdn.net/v/t1.6435-9/132359199_10159156474064529_4155935005861415517_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=JmpEai9A5iYAX9VNlnf&_nc_ht=scontent-ort2-1.xx&oh=c50d31d19d47473151f4a3e09c6b85c2&oe=61A53AAA'
					alt=''
				/>
			</Menu.Button>
		</div>
		<Transition
			as={Fragment}
			enter='transition ease-out duration-100'
			enterFrom='transform opacity-0 scale-95'
			enterTo='transform opacity-100 scale-100'
			leave='transition ease-in duration-75'
			leaveFrom='transform opacity-100 scale-100'
			leaveTo='transform opacity-0 scale-95'
		>
			<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
				<Menu.Item>
					{({ active }) => (
						<Link
							to='/profile'
							className={classNames(
								active ? 'bg-gray-100' : '',
								'block px-4 py-2 text-sm text-gray-700'
							)}
						>
							Your Profile
						</Link>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<Link
							to='/profile/preferences'
							className={classNames(
								active ? 'bg-gray-100' : '',
								'block px-4 py-2 text-sm text-gray-700'
							)}
						>
							Settings
						</Link>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<Link
							to='/logout'
							className={classNames(
								active ? 'bg-gray-100' : '',
								'block px-4 py-2 text-sm text-gray-700'
							)}
						>
							Logout
						</Link>
					)}
				</Menu.Item>
			</Menu.Items>
		</Transition>
	</Menu>
);

const Header = () => {
	return (
		<Disclosure as='nav' className='bg-gray-800'>
			{({ open }) => (
				<>
					<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
						<div className='relative flex items-center justify-between h-16'>
							<MenuButton open={open} />
							<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
								<Logo />
								<DesktopNavigation />
								<SearchBar />
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<NotificationButton />
								<UserProfileMenu />
							</div>
						</div>
					</div>
					<MobileNavigation />
				</>
			)}
		</Disclosure>
	);
};

export default Header;
