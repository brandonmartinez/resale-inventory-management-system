import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from './components/layout/header';

const App = () => {
	return (
		<>
			<Header />
			<div className='container max-w-7xl mx-auto py-0 px-6 md:py-5 md:px-6'>
				<Outlet />
			</div>
		</>
	);
};
export default App;
