import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import SelectCategory from './SelectCategory';
// import CommentForm from './CommentForm';
import HomeButton from 'react-icons/lib/fa/home';

class CreatePostForm extends Component {
	// Triggered by onSubmit in the post form.
  submitPost = (values) => {
    /*
     * Call the `displayPost` property function passed
     * to props by `mapDispatchToProps`.
     * Get the values from the post form and dispatch the
     * action `addPost` from the reducer passing the post
     * object as argument.
     */
    this.props.setPostValues({
        title: values.title,
        author: values.author,
        category: values.category,
        body: values.body,
    });
  }

  render() {
  	console.log(this.props);
  	return (
  		<div className='container'>
  			<Link
					to={'/'}
				>
					<div className='button-home'>
						<HomeButton
		      		size='40'
		      	/>
					</div>
	      </Link>
	      <SelectCategory />
	  		<div className='create-post-form'>
	  			{
	  				/*
	  				 * Post form.
	  				 */
	  			}
		  		<h2>Add a post</h2>
					<div className='post-form-container'>
						<PostForm
							/*
		           * `onSubmit` prop passed from the App Container to the
		           * PostForm Component.
		           * The Component will look for it in its prop to know
		           * what `handleSubmit` will do with the values passed
		           * by the user in the form.
		           */
				    	onSubmit={this.submitPost}
				    />
				   </div>
	  		</div>
  		</div>
  	)
  }
}

export default CreatePostForm;