export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const Loading = () => (
	<div classNames='block w-full text-center'>
		<div
			style={{ 'border-top-color': 'transparent' }}
			className='w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin mx-auto'
		></div>
	</div>
);
