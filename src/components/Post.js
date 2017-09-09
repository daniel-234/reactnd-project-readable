import React, { Component } from 'react';

class Post extends Component {
	render() {
		// Get the current post.
		const post = this.props.post;
		console.log(post);
		// Get the number of comments to the post.
		const commentsLength = post.comments ? post.comments.length : 0;
		console.log(commentsLength);

		return (
			<div className='post-details'>
      	{
        	/*
        	 * Provides navigation to this Post View (referenced by postId in
        	 * the URL).
        	 *
        	 * Wraps the post title as an anchor tag.
        	 */
        }
        <p className='post-title'>
        	{ post.title }
        </p>
        <p className='post-body'>
        	{ post.body }
        </p>
        <p className='post-author'>
          author: { post.author }
        </p>
        <p className='post-separator'>
          |
        </p>
        <p className='post-score'>
          { post.voteScore } points
        </p>
        <p className='post-separator'>
          |
        </p>
        <p className='post-comments'>
          { commentsLength } comments
        </p>
      </div>
		);
	}
}

export default Post;