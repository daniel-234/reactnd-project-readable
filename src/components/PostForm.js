import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

let PostForm = props => {
	const { handleSubmit, getPosts } = props;
  console.log(getPosts());
	return (
    /*
     * "Redux form provides a special `handleSubmit` function that we
     * give to the form on submit.
     * There are two different ways to use the `handleSubmit`.
     * You can just pass `handleSubmit`, in which case Redux will just
     * look for a `onSubmit` prop that was given to your Component by
     * its Container and we'll use it for submitting.
     * If, instead, you want self-contained submission inside of your
     * form Component, you can give it your own function and it will use
     * that instead".
     */
		<form onSubmit={ handleSubmit }>
      <div>
        <label>Title</label>
        <Field name='title' component='input' type='text' />
      </div>
      <div>
        <label>Author</label>
        <Field name='author' component='input' type='text' />
      </div>
      <div>
        <label>Category</label>
        <Field name='category' component='select'>
          <option></option>
          <option value='react'>React</option>
          <option value='redux'>Redux</option>
          <option value='udacity'>Udacity</option>
        </Field>
      </div>
      <div>
        <label>Body</label>
        <Field name='body' component='textarea' />
      </div>
      <div>
        <label>Post</label>
        <Field name='allPosts' component='select'>
          <option></option>
          {getPosts().map((postId, index) => (
            <option
              key={index}
              name={postId}
              value={postId}
            >
              {String(postId)}
            </option>
          ))}
        </Field>

      </div>
      <div>
        <label>Comment</label>
        <Field name='comment' component='textarea' />
      </div>
      <button className='button' type='submit'>Submit</button>
		</form>
	)
}

// Clear the form after submitting.
const afterSubmit = (result, dispatch) => (
	dispatch(reset('posts'))
);

/*
 * Decorate PostForm with `reduxForm` decorator.
 * We give the `reduxForm` decorator the name of our form and that is
 * going to be used as the key for our form data in the Redux store. So
 * it needs to be unique for this form.
 * The `reduxForm` function gives back a decorator which can be used to
 * decorate our Component.
 * What that does is it creates what's called a higher-order Component
 * that wraps our form Component and can provide it props and functionality.
 */
PostForm = reduxForm({
	form: 'posts',
	onSubmitSuccess: afterSubmit
})(PostForm)

export default PostForm;