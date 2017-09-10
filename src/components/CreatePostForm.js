import React, { Component } from 'react';
import PostForm from './PostForm';
import CommentForm from './CommentForm';

class CreatePostForm extends Component {
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


  // TODO refactor

  // Triggered by onSubmit in the comment form.
  submitComment = (values) => {
    /*
     * Call the `displayComment` property function passed
     * to props by `mapDispatchToProps`.
     * Get the values from the comment form and dispatch the
     * action `addComment` from the reducer passing the comment
     * object and the related post id as arguments.
     */
    console.log(values);
    this.props.setCommentValues({
        body: values.comment,
        // For now just add comments to the same post.
        // TODO change it.
        parentId: values.allPosts
    });
    // Get the comments from the server.
    // this.props.getAllComments();
  }

  // Get all the submitted posts from any category.
  getThePosts = () => {
    const allPosts = this.props.posts.allPosts;
    return allPosts;
  }

  render() {
  	return (

  		// TODO complete
			// Used just to chack that the Link and Route work correctly.
			<div>
				<PostForm
		    	onSubmit={this.submitPost}
		    />

		    <h2>Add a comment</h2>
		    <CommentForm
		    	onSubmit={this.submitComment}
		    	getPosts={this.getThePosts}
		    />
			</div>
  	)
  }
}

export default CreatePostForm;