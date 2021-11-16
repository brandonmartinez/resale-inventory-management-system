const Welcome = () => {
	return (
		<section className='pt-24'>
			<div className='px-12 mx-auto max-w-7xl'>
				<div className='w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center'>
					<h1 className='mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight'>
						<span>Thrift First</span>
						<br />
						<span>Shift Second</span>
					</h1>
					<p className='px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24'>
						Manage all of your thrifting finds in one place. Take photos, track
						items, and organize your storage rooms with ease.
					</p>
					<div className='mb-4 space-x-0 md:space-x-2 md:mb-8'>
						<a
							href='#_'
							className='inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0'
						>
							Get Started
							<svg
								className='w-4 h-4 ml-1'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
									clipRule='evenodd'
								></path>
							</svg>
						</a>
						<a
							href='#_'
							className='inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0'
						>
							Learn More
							<svg
								className='w-4 h-4 ml-1'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
								></path>
							</svg>
						</a>
					</div>
				</div>
				<div className='w-full mx-auto mt-20 text-center md:w-10/12'>
					<div className='relative z-0 w-full mt-8'>
						<div className='relative overflow-hidden shadow-2xl'>
							<div className='flex items-center flex-none px-4 bg-green-400 rounded-b-none h-11 rounded-xl'>
								<div className='flex space-x-1.5'>
									<div className='w-3 h-3 border-2 border-white rounded-full'></div>
									<div className='w-3 h-3 border-2 border-white rounded-full'></div>
									<div className='w-3 h-3 border-2 border-white rounded-full'></div>
								</div>
							</div>
							<img src='/photos/hero-001.jpg' alt='hero' />
						</div>
					</div>
				</div>
			</div>
			<div className='container mx-auto max-w-4xl'>
				<div className='mt-10 text-center'>
					<h1 className='text-4xl font-bold text-gray-800'>Pricing plans</h1>
					<p className='text-lg mt-3 font-semibold'>
						Every plan includes 30 day free trial
					</p>
				</div>
				<div className='mt-8'>
					<div className='flex justify-between'>
						<div>
							<p className='text-sm text-gray-600'>
								For more details on all our pricing visit{' '}
								<span className='underline cursor-pointer text-blue-600'>here</span>
							</p>
						</div>
						<div className='flex space-x-16'>
							<div className='flex'>
								<span className='font-semibold inline mr-4'>Plan</span>
								<span className='px-4 py-1 rounded-md text-sm bg-gray-300 flex items-center cursor-pointer'>
									Monthly
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-4 w-4 ml-2'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M19 9l-7 7-7-7'
										/>
									</svg>
								</span>
							</div>
							<div className='flex'>
								<span className='font-semibold inline mr-4 '>Select currency</span>
								<span className='px-4 py-1 rounded-md text-sm bg-gray-300 flex items-center cursor-pointer'>
									$ USD
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-4 w-4 ml-2'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M19 9l-7 7-7-7'
										/>
									</svg>
								</span>
							</div>
						</div>
					</div>
					<div></div>
				</div>
				<hr className='mt-10' />
				<div className='flex space-x-10 pt-10'>
					<div className='py-12'>
						<div className='bg-white pt-4 rounded-xl space-y-6 overflow-hidden  transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer'>
							<div className='px-8 flex justify-between items-center'>
								<h4 className='text-xl font-bold text-gray-800'>Hobby</h4>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-gray-700'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
							</div>
							<h1 className='text-4xl text-center font-bold'>$10.00</h1>
							<p className='px-4 text-center text-sm '>
								It is a long established fact that a reader will be distracted
								by the readable content of a page when looking at its layout.
								The point of using Lorem
							</p>
							<ul className='text-center'>
								<li>
									<a href='#' className='font-semibold'>
										It is a long established
									</a>
								</li>
								<li>
									<a href='#' className='font-semibold'>
										It is a long established
									</a>
								</li>
								<li>
									<a href='#' className='font-semibold'>
										It is a long established
									</a>
								</li>
							</ul>
							<div className='text-center bg-gray-200 '>
								<button className='inline-block my-6 font-bold text-gray-800'>
									Get started today
								</button>
							</div>
						</div>
					</div>
					<div className='py-12'>
						<div className='bg-white  pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 -translate-y-2 scale-105 shadow-xl hover:shadow-2xl cursor-pointer'>
							<div className='px-8 flex justify-between items-center'>
								<h4 className='text-xl font-bold text-gray-800'>Professional</h4>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-pink-600'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
									/>
								</svg>
								<h1 className='text-4xl text-center font-bold'>$30.00</h1>
								<p className='px-4 text-center text-sm '>
									It is a long established fact that a reader will be distracted
									by the readable content of a page when looking at its layout.
									The point of using Lorem
								</p>
								<ul className='text-center'>
									<li>
										<a href='#' className='font-semibold'>
											It is a long established
										</a>
									</li>
									<li>
										<a href='#' className='font-semibold'>
											It is a long established
										</a>
									</li>
									<li>
										<a href='#' className='font-semibold'>
											It is a long established
										</a>
									</li>
								</ul>
								<div className='text-center bg-pink-600 '>
									<button className='inline-block my-6 font-bold text-white'>
										Get started today
									</button>
								</div>
							</div>
						</div>
						<div className='py-12'>
							<div className='bg-white pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer'>
								<div className='px-8 flex justify-between items-center'>
									<h4 className='text-xl font-bold text-gray-800'>Business</h4>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 text-gray-700'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<h1 className='text-4xl text-center font-bold'>$45.00</h1>
								<p className='px-4 text-center text-sm '>
									It is a long established fact that a reader will be distracted
									by the readable content of a page when looking at its layout.
									The point of using Lorem
								</p>
								<ul className='text-center'>
									<li>
										<a href='#' className='font-semibold'>
											It is a long established
										</a>
									</li>
									<li>
										<a href='#' className='font-semibold'>
											It is a long established
										</a>
									</li>
									<li>
										<a href='#' className='font-semibold'>
											It is a long established
										</a>
									</li>
								</ul>
								<div className='text-center bg-gray-200 '>
									<button className='inline-block my-6 font-bold text-gray-800'>
										Get started today
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Welcome;
