import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import PostFormLink from './PostFormLink';
import ArrowUp from 'react-icons/lib/fa/sort-asc';
import ArrowDown from 'react-icons/lib/fa/sort-desc';
import { convertToReadableDate } from '../utils/convertDate';

class Category extends Component {
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
		/*
     * Extract properties from props.
     */
    const posts = this.props.posts;
    const sortedIds = this.props.sortedIds;
    // Get the `selected category` from the match props from `App.js`.
    const selectedCategory = this.props.selectedCategory;
    // Format the category name to have a capital letter.
    const visibleCategoryName = selectedCategory.charAt(0).toUpperCase() + selectedCategory.substring(1);

		return (
			<div className='category-related-posts'>
				<h2>{visibleCategoryName} {' Posts'} </h2>
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
	      		<select onChange={this.handleChange}>
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
				<div className='container'>
					<ul className='all-posts'>
          	{
          		/*
							 * Loop through the posts ids array and filter only the
							 * ids whose correspondent items match the selected category.
							 * For each of these items, then, extract the requested
							 * properties from the relative post.
          		 */
          	}
            {sortedIds.filter((postId) => (
            		// Hardcode the selected category for now.
            		posts[postId].category === selectedCategory
            	)).map((postId) => (
              <li key={postId} className='single-post'>
                <div className='single-post-wrapper'>
		            	{
		            		/*
		            		 * Controls to increment and decrement the vote score
		            		 * for this object post.
		            		 */
		            	}
		            	<div className='post-voting-icons'>
		          			<ArrowUp
		          				className='up=arrow'
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
		                <p className='post-author'>
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

export default Category;