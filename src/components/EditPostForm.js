import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import HomeButton from 'react-icons/lib/fa/home';

class EditPostForm extends Component {
	// Triggered by onSubmit in the post form.
  submitPost = (values) => {
    console.log(values);
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

    /*
     * After the new post is submitted, get the state synchronized
     * with the server.
     */
    this.props.getAllPosts();
    // this.props.getAllComments();
  }

  // Get all the submitted posts from any category.
  getThePosts = () => {
    // const allPosts = this.props.posts.allPosts;
    const allPosts = this.props.allPosts;
    console.log(this.props.allPostsIds);
    console.log(allPosts);
    return allPosts;
  }

  render() {
  	console.log(this.props);
  	return (
  		<div className='container'>
  			<Link
						to={'/'}
					>
						<HomeButton
		      		size='40'
		      	/>
		      </Link>
	  		<div className='create-post-form'>
	  			{
	  				/*
	  				 * Post form.
	  				 */
	  			}
		  		<h2>Edit post</h2>
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

export default EditPostForm;