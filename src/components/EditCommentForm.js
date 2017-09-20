import React, { Component } from 'react';
import InitializeCommentForm from '../containers/InitializeCommentForm';

class EditCommentForm extends Component {
	// Triggered by onSubmit in the post form.
  submitComment = (values) => {
    console.log(values);
    console.log(this.props);

    const commentId = values.id;
    /*
     * Call the `displayPost` property function passed
     * to props by `mapDispatchToProps`.
     * Get the values from the post form and dispatch the
     * action `addPost` from the reducer passing the post
     * object as argument.
     */
    this.props.editComment(
      commentId,
      {
        body: values.body
      }
    );
  }

  render() {
    const commentId = this.props.commentId;
  	return (
  		<div className='container'>
	  		<div className='edit-comment-form'>
	  			{
	  				/*
	  				 * Comment form.
	  				 */
	  			}
		  		<h2>Edit comment</h2>
					<div className='comment-form-container'>
						<InitializeCommentForm
							/*
		           * `onSubmit` prop passed from the App Container to the
		           * CommentForm Component.
		           * The Component will look for it in its prop to know
		           * what `handleSubmit` will do with the values passed
		           * by the user in the form.
		           */
				    	onSubmit={this.submitComment}
              commentId={commentId}
				    />
				  </div>
	  		</div>
  		</div>
  	)
  }
}

export default EditCommentForm;