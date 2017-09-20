import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

/*
 * Synchronous client-side form validation.
 *
 * Provide the redux-form with a validation function that takes an
 * object of form values and returns an object of errors.
 * This is done by providing the validation function to the decorator
 * as a config parameter, or to the decorated form component as a prop.
 * See redux-form Synchronous Validation Example.
 */
const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 30) {
    errors.title = 'Must be 30 characters or less';
  } else if (!isNaN(Number(values.title))) {
    errors.title = 'Invalid title. You inserted a number';
  }
  if (!values.author) {
    errors.author = 'Required';
  } else if (values.author.length > 25) {
    errors.author = 'Must be 25 characters or less';
  } else if (!isNaN(Number(values.author))) {
    errors.author = 'Invalid title. You inserted a number';
  }
  if (!values.body) {
    errors.body = 'You must insert a post body';
  } else if (values.body.length > 1000) {
    errors.body = 'Post body must be 1000 characters or less'
  } else if (!isNaN(Number(values.body))) {
    errors.body = 'Invalid body. You inserted a number';
  }
  return errors;
};

// Custom component to render an `input` component type.
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>
        ))
      }
    </div>
  </div>
)

// Custom component to render a `textarea` component type.
const textAreaField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>
      {label}
    </label>
    <div>
      <textarea {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>
        ))
      }
    </div>
  </div>
)

let PostForm = ((props) => {
	const { handleSubmit, submitting } = props;
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
      <Field
        className='form-input-title'
        name='title'
        type='text'
        component={renderField}
        label='Title'
      />
      <Field
        className='form-input-author'
        name='author'
        type='text'
        component={renderField}
        label='Author'
      />
      <div>
        <label>
          Select category
        </label>
        <div>
          <Field
            className='category-select'
            name='category'
            component='select'
            label='Select category'>
              <option value='react'>React</option>
              <option value='redux'>Redux</option>
              <option value='udacity'>Udacity</option>
          </Field>
        </div>
      </div>

      <Field
        className='post-body-textarea'
        name='body'
        component={textAreaField}
        label='Insert post body'
      />
      <button
        className='post-submit-button'
        type='submit'
        disabled={submitting}
      >
        Submit
      </button>
		</form>
	);
});

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
  validate,
	onSubmitSuccess: afterSubmit
})(PostForm)

export default PostForm;