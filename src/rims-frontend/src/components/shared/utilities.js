export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const Prose = ({ className, children }) => (
	<div className={classNames('prose-sm prose-seafoam', className)}>
		{children}
	</div>
);

export const Loading = () => (
	<div className='flex justify-center justify-items-center w-full h-full bg-white'>
		<div
			style={{ 'border-top-color': 'transparent' }}
			className='m-20 w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin'
		></div>
	</div>
);
