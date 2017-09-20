import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import InitializePostForm from '../containers/InitializePostForm';
import HomeButton from 'react-icons/lib/fa/home';

class EditPostForm extends Component {
	// Triggered by onSubmit in the post form.
  submitPost = (values) => {
    const postId = values.id;
    /*
     * Call the `displayPost` property function passed
     * to props by `mapDispatchToProps`.
     * Get the values from the post form and dispatch the
     * action `addPost` from the reducer passing the post
     * object as argument.
     */
    this.props.editPost(
      postId,
      {
        title: values.title,
        category: values.category,
        body: values.body,
      }
    );
  }

  // Get all the submitted posts from any category.
  getThePosts = () => {
    const allPosts = this.props.allPosts;
    return allPosts;
  }

  render() {
    const post = this.props.post;
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
		  		<h2>Edit post</h2>
					<div className='post-form-container'>
						<InitializePostForm
							/*
		           * `onSubmit` prop passed from the App Container to the
		           * PostForm Component.
		           * The Component will look for it in its prop to know
		           * what `handleSubmit` will do with the values passed
		           * by the user in the form.
		           */
				    	onSubmit={this.submitPost}
              post={post}
				    />
				  </div>
	  		</div>
  		</div>
  	)
  }
}

export default EditPostForm;