import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

let PostForm = props => {
	const { handleSubmit } = props;

	return (
		<form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="title">Title:</label>
        <Field name='title' component='input' type='text' />
      </div>
      <div>
        <label htmlFor='author'>Author:</label>
        <Field name='author' component='input' type='text' />
      </div>
      <div>
        <label htmlFor='body'>Body:</label>
        <Field name='body' component='input' type='textarea' />
      </div>
      <button type='submit'>Submit</button>
		</form>
	)
}

// Clear the form after submitting.
const afterSubmit = (result, dispatch) => (
	dispatch(reset('posts'))
);

PostForm = reduxForm({
	form: 'posts',
	onSubmitSuccess: afterSubmit
})(PostForm)

export default PostForm;