import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const TextBox = ({ id, label, placeholder, ...rest }) => (
	<FloatingLabel controlId={id} label={label} className='mb-3'>
		<Form.Control
			type='text'
			placeholder={placeholder}
			title={placeholder}
			{...rest}
		/>
	</FloatingLabel>
);

export const TextArea = ({ id, label, placeholder, ...rest }) => (
	<FloatingLabel controlId={id} label={label} className='mb-3'>
		<Form.Control
			as='textarea'
			placeholder={placeholder}
			title={placeholder}
			style={{ height: '5rem' }}
			{...rest}
		/>
	</FloatingLabel>
);

export const DropDown = ({ id, label, placeholder, items, ...rest }) => (
	<FloatingLabel controlId={id} label={label} className='mb-3'>
		<Form.Select aria-label={placeholder} {...rest}>
			<option></option>
			{items.map((item, i) => (
				<option key={`${id}-${i}`} value={item.value || item.text}>
					{item.text}
				</option>
			))}
		</Form.Select>
	</FloatingLabel>
);

export const FieldPrefix = ({ text, children }) => (
	<InputGroup className='mb-3'>
		<InputGroup.Text>{text}</InputGroup.Text>
		{children}
	</InputGroup>
);

export const FieldSuffix = ({ text, children }) => (
	<InputGroup className='mb-3'>
		{children}
		<InputGroup.Text>{text}</InputGroup.Text>
	</InputGroup>
);

export const Submit = ({ ...rest }) => (
	<Button variant='primary' type='submit' {...rest}>
		Submit
	</Button>
);
