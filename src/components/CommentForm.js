import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

let CommentForm = props => {
	const { handleSubmit, getPosts } = props;
  // console.log(handleSubmit);
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
        <label className='comment-label-post-reference'>Post</label>
        <Field className='post-select' name='allPosts' component='select'>
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
        <label className='comment-body-label'>Comment</label>
        <Field className='comment-body-textarea' name='comment' component='textarea' />
      </div>
      <button className='comment-submit-button' type='submit'>Submit</button>
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
CommentForm = reduxForm({
	form: 'posts',
	onSubmitSuccess: afterSubmit
})(CommentForm)

export default CommentForm;