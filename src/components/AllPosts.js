import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import PostFormLink from './PostFormLink';
// import AddTextIcon from 'react-icons/lib/fa/quote-right';
import ArrowUp from 'react-icons/lib/fa/sort-asc';
import ArrowDown from 'react-icons/lib/fa/sort-desc';
import HomeButton from 'react-icons/lib/fa/home';
import { convertToReadableDate } from '../utils/convertDate';

class AllPosts extends Component {
	// Upvote a post.
	upvote = (postId) => {
		this.props.votePosts(postId, 'upVote');
	}

	// Downvote a post.
	downvote = (postId) => {
		this.props.votePosts(postId, 'downVote');
	}

	deleteThisPost = (postId) => {
		this.props.deletePost(postId);
	}

	handleChange = (event) => {
		const newOrder = event.target.value;
		this.props.sortPosts(newOrder);
	}

	render() {
    // Extract posts passed via props from the container component.
    console.log(this.props);
    const posts = this.props.posts;
    const sortedIds = this.props.sortedIds;

    // console.log(posts)
    // console.log(sortedIds)


		return (
			<div className='container'>
				<HomeButton
      		size='40'
      	/>
				{
				/*
				 * Navigation links to select a category View.
				 */
				}
	      <SelectCategory />
	      {
	      	/*
	      	 * `Plus` icon that links to the create post form View.
	      	 */
	      }
	      <div className='post-icons'>
	      	<PostFormLink />
	      </div>
	      <div className='sort-select-form'>
	      	<form onSubmit={this.handleSubmit}>
	      		<label>
	      			Sort posts by: {' '}
	      		</label>
	      		<select value= {this.props.sortOrder} onChange={this.handleChange}>
		      		<option value='MOST_RECENT'>most recent</option>
		      		<option value='LEAST_RECENT'>least recent</option>
	      			<option value='HIGHEST_POINTS'>highest points</option>
	      			<option value='LOWEST_POINTS'>lowest points</option>
	      		</select>
	      	</form>
	      </div>
	      {
	      	/*
	      	 * Posts list.
	      	 */
	      }
	      <div className='all-posts-list'>
		      {
		      	/*
						 * List all the available posts from the server, getting
						 * some of its properties to the user.
		      	 */
		      }
		      <ul className='all-posts'>
		      	{
		      		/*
							 * Loop through the posts ids array and, for every item
							 * in there, extract the requested properties from the
							 * relative post.
		      		 */
		      	}
		        {sortedIds.map((postId) => (
		          <li key={postId} className='single-post'>
		          	{ /*console.log(posts[postId].comments) */}
		          	<div className='single-post-wrapper'>
		            	{
		            		/*
		            		 * Controls to increment and decrement the vote score
		            		 * for this object post.
		            		 */
		            	}
		            	<div className='post-voting-icons'>
		          			<ArrowUp
		          				className='up-arrow'
		          				size={20}
		          				value={postId}
		          				onClick={() => this.upvote(postId)}
		          				// postId={postId}
		          			/>
		          			<ArrowDown
		          				className='down-arrow'
		          				size={20}
		          				value={postId}
		          				onClick={() => this.downvote(postId)}
		          				// postId={postId}
		          			/>
		            	</div>
		            	{
		            		/*
		            		 * Post details.
		            		 */
		            	}
		              <div className='post-details'>
		              	{
		                	/*
		                	 * Provides navigation to this Post View (referenced by postId in
		                	 * the URL).
		                	 *
		                	 * Wraps the post title as an anchor tag.
		                	 */
		                }
		              	<Link
			            		to={'/' + posts[postId].category + '/' + postId}
			            	>
		                  <p className='post-title'>
		                    { posts[postId].title }
		                  </p>
		                </Link>
		                <p className='post-author'>
		                  author: { posts[postId].author }
		                </p>
		                <p className='post-separator'>
		                  |
		                </p>
		                <p className='post-date'>
		                  { convertToReadableDate(posts[postId].timestamp) }
		                </p>
		                <p className='post-separator'>
		                  |
		                </p>
		                <p className='post-score'>
		                  { posts[postId].voteScore } points
		                </p>
		                <p className='post-separator'>
		                  |
		                </p>
		                <p className='post-comments'>
		                  { posts[postId].comments.length } comments
		                </p>
		                <p className='post-separator'>
		                  |
		                </p>
		                <p className='post-edit-link'>
			              	<Link to={'/edit/' + postId}>
			                  edit
			                </Link>
		                </p>
		                <p className='post-separator'>
		                  |
		                </p>
		                <p
			                className='post-delete-link'
			                onClick={() => this.deleteThisPost(postId)}
			              >
		                  delete
		                </p>
		              </div>
		            </div>
		          </li>
		        ))}
		      </ul>
		    </div>
			</div>
		);
	}
}

export default AllPosts;