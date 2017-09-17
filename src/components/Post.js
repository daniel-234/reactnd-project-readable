import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SelectCategory from './SelectCategory';
import EditPostButtonLink from './EditPostButtonLink';
import EditCommentForm from './EditCommentForm';
import CommentForm from './CommentForm';
import { convertToReadableDate } from '../utils/convertDate';
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down';
import HomeButton from 'react-icons/lib/fa/home';
import CommentsButton from 'react-icons/lib/fa/comments-o';
import EditButton from 'react-icons/lib/fa/edit';
import DeleteButton from 'react-icons/lib/fa/trash-o';
import AddTextIcon from 'react-icons/lib/fa/plus-circle';


class Post extends Component {
	constructor() {
		super();
		this.state = {
			showAddCommentModal: false,
			showEditCommentModal: false,
			commentId: null
		};

		this.handleOpenAddCommentModal = this.handleOpenAddCommentModal.bind(this);
		this.handleOpenEditCommentModal = this.handleOpenEditCommentModal.bind(this);
		this.handleCloseAddCommentModal = this.handleCloseAddCommentModal.bind(this);
		this.handleCloseEditCommentModal = this.handleCloseEditCommentModal.bind(this);
	}

	handleOpenAddCommentModal = ({ commentId }) => {
		this.setState(() => ({
			showAddCommentModal: true,
			showEditCommentModal: false,
			commentId
		}));
		console.log(this.state.commentId);
	}

	handleCloseAddCommentModal = () => {
		this.setState(() => ({
			showAddCommentModal: false,
			showEditCommentModal: false,
			commentId: null
		}));
	}

	handleOpenEditCommentModal = ({ commentId }) => {
		this.setState(() => ({
			showEditCommentModal: true,
			showAddCommentModal: false,
			commentId
		}));
		console.log(this.state.commentId);
	}

	handleCloseEditCommentModal = () => {
		this.setState(() => ({
			showEditCommentModal: false,
			showAddCommentModal: false,
			commentId: null
		}));
	}

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

	// editThisComment = (commentId) => (
	// 	<InitializeCommentForm />
	// 	)
	// // 	console.log(commentId);

	// }

	addComment = (postId) => {
		this.handleOpenAddCommentModal({ postId })
	}

	editThisComment = (commentId) => (
		this.handleOpenEditCommentModal({ commentId })
	);

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

	submitComment = (values) => {
    /*
     * Get the values from the comment form and dispatch the
     * action `addComment` from the reducer passing the comment
     * object and the related post id as arguments.
     */
    console.log(this.props);
    // const commentsToPost = this.props.commentsToPost

    // for (let i = 0; i < commentsToPost.length; i++) {
    // 	if (commentId === commentsToPost.id) {
    // 		this.props.editComment(
		  //     commentId,
		  //   {
	   //      author: values.author,
	   //      body: values.body,
	   //      parentId: postId
		  //   });
    // 	}
    // }
    const postId = this.props.post.id;
    this.props.addAComment({
    	author: values.author,
      body: values.comment,
      parentId: postId
    });
  }

	render() {
		console.log(this.props);


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
    			<AddTextIcon
    				className='add-comment-button'
	    			size={40}
	    			onClick={() => this.addComment(postId)}
	    		/>
    			<EditPostButtonLink
    				post={this.props.post}
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
					        <p className='comment-date'>
					          { convertToReadableDate(comments[commentId].timestamp) }
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
					        <p className='comment-upvote' onClick={() => this.upvoteAComment(commentId)}>
					          + 1
					        </p>
					        <p className='comment-separator'>
					          |
					        </p>
					        <p className='comment-downvote' onClick={() => this.downvotACommente(commentId)}>
					          - 1
					        </p>
					        <p className='comment-separator'>
					          |
					        </p>
					        <p className='comment-edit' onClick={() => this.editThisComment(commentId)}>
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

	      {
	      	/*
					 <div className='comment-form-container'>
			    <h2>Add a comment</h2>
			    <CommentForm
			    	onSubmit={this.submitComment}
			    />
				</div>
				*/ }


	      <Modal
	      	isOpen={this.state.showAddCommentModal}
	      	contentLabel='Add Comment Modal'
	      >
	      	<button onClick={this.handleCloseAddCommentModal}>Close Add Comment Modal</button>
					<div className='edit-comment-modal-container'>
				    <CommentForm
				    	onSubmit={this.submitComment}
				    	addComment={this.props.addAComment}
				    />
					</div>
	      </Modal>



				<Modal
					// className='modal'
					isOpen={this.state.showEditCommentModal}
					contentLabel='Edit Comment Modal'
				>
					{console.log(this.state.commentId)}
					<button onClick={this.handleCloseEditCommentModal}>Close Edit Comment Modal</button>
					<div className='edit-comment-modal-container'>
				    <EditCommentForm
				    	onSubmit={this.submitComment}
				    	commentId={this.state.commentId}
				    	editComment={this.props.editComment}
				    	// updateComment={this.props.updateComment}
				    />
					</div>
				</Modal>


			</div>
		);
	}
}

export default Post;