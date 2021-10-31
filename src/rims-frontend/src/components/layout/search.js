// Library Imports

import Form from 'react-bootstrap/Form';

import { SearchBox } from '../shared/forms';

const Search = () => {
	return (
		<Form>
			<SearchBox id='search' label='Search' placeholder='Search…' />
		</Form>
	);
};

export default Search;
