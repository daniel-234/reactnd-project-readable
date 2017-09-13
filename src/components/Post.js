import React, { Component } from 'react';
import SelectCategory from './SelectCategory';
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

class Post extends Component {
	// Upvote a post.
	upvote = (postId) => {
		this.props.votePosts(postId, 'upVote');
	}

	// Downvote a post.
	downvote = (postId) => {
		this.props.votePosts(postId, 'downVote');
	}

	handleSubmit = (event) => {
		event.preventDefault();
	}

	handleChange = (event) => {
		const newOrder = event.target.value;
		this.props.sortPosts(newOrder);
	}

	render() {
		// Get the current post.
		const post = this.props.post;
		const postId = post.id;

		// console.log(post);
		// console.log(this.props);

		// Get the number of comments to the post.
		const commentsLength = post.comments ? post.comments.length : 0;
		console.log(commentsLength);

		return (
			<div className='container'>
				<SelectCategory />
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
	      <div className='post-icons'>
	      	<ThumbsUp
	      		className='thumbs-up-button'
	      		size='40'
	      		value={postId}
    				onClick={() => this.upvote(postId)}
    			/>
		      <ThumbsDown
			      className='thumbs-down-button'
			      size='40'
			      value={postId}
    				onClick={() => this.downvote(postId)}
    			/>
	      </div>
			</div>
		);
	}
}

export default Post;