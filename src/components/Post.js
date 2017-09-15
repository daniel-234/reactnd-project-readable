import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import EditPostButtonLink from './EditPostButtonLink';
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down';
import HomeButton from 'react-icons/lib/fa/home';
import CommentsButton from 'react-icons/lib/fa/comments-o';
import EditButton from 'react-icons/lib/fa/edit';
import DeleteButton from 'react-icons/lib/fa/trash-o';

class Post extends Component {
	// Upvote a post.
	upvote = (postId) => {
		this.props.votePosts(postId, 'upVote');
	}

	// Downvote a post.
	downvote = (postId) => {
		this.props.votePosts(postId, 'downVote');
	}

	upvoteAComment = (commentId) => {
		this.props.voteComment(commentId, 'upVote');
	}

	downvotACommente = (commentId) => {
		this.props.voteComment(commentId, 'downVote')
	}

	deleteThisPost = (postId) => {
		this.props.deletePost(postId);
	}

	editThisPost = (postId) => {
		// this.props.editPost(postId, this.props.post);
		console.log('EDIT')
	}

	deleteThisComment = (commentId) => {
		const parentId = this.props.commentsToPost[commentId].parentId;
		this.props.deleteComment(commentId, parentId);
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
		// Check if the post has been deleted
		if (Object.keys(post).length === 0) {
			// Display a message to the user.
			return (
				<div className='container'>
					<Link
						to={'/'}
					>
						<HomeButton
		      		size='40'
		      	/>
		      </Link>
	      	<div className='success-delete-message'>
						<h2>Post deleted successfully!</h2>
					</div>
				</div>
			);
		}

		// Get the post id.
		const postId = post.id;

		// Get the comments ids related to this post.
		const idsOfCommentsToPost = post.comments;
		/*
		 * Get the comments object (to take the properties)
		 * from comments related to this post.
		 */
		const comments = this.props.commentsToPost;

		// Get the number of comments to the post.
		const commentsLength = post.comments ? post.comments.length : 0;
		console.log(commentsLength);

		return (
			<div className='container'>
				<Link
					to={'/'}
				>
					<HomeButton
	      		size='40'
	      	/>
	      </Link>
				<SelectCategory />
				<div className='single-post-details'>
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
    			<CommentsButton
    				className='comments-button'
    				size='40'
    			/>
    			<EditPostButtonLink
    				post={this.props.post}
    				// onClick={() => this.editThisPost(postId)}
    				provaInPost='BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
	      	/>
	      	<DeleteButton
	      		className='delete-button'
	      		size='40'
	      		value={postId}
	      		onClick={() => this.deleteThisPost(postId)}
	      	/>
	      </div>

	      <div className='all-comments-list'>
	      	<ul className='all-comments'>
	      		{idsOfCommentsToPost.map((commentId) => (
	      			<li key={commentId} className='single-comment'>
		      			<div className='comment-details'>
					      	{
					        	/*
					        	 * Provides navigation to this Post View (referenced by postId in
					        	 * the URL).
					        	 *
					        	 * Wraps the post title as an anchor tag.
					        	 */
					        }
					        <p className='comment-body'>
					        	{ comments[commentId].body }
					        </p>
					        <p className='comment-author'>
					          author: { comments[commentId].author }
					        </p>
					        <p className='comment-separator'>
					          |
					        </p>
					        <p className='comment-score'>
					          { comments[commentId].voteScore } points
					        </p>
					        <p className='comment-separator'>
					          |
					        </p>
					        <p className='comment-score' onClick={() => this.upvoteAComment(commentId)}>
					          + 1
					        </p>
					        <p className='comment-separator'>
					          |
					        </p>
					        <p className='comment-score' onClick={() => this.downvotACommente(commentId)}>
					          - 1
					        </p>
					        <p className='comment-separator'>
					          |
					        </p>
					        <p className='comment-edit'  onClick={() => this.editThisComment(postId)}>
					          edit
					        </p>
					        <p className='comment-separator'>
					          |
					        </p>
					        <p className='comment-delete' onClick={() => this.deleteThisComment(commentId)}>
					          delete
					        </p>
					      </div>
		      		</li>
	      		))}
	      	</ul>
	      </div>
			</div>
		);
	}
}

export default Post;