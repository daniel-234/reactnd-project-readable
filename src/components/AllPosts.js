import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import PostFormLink from './PostFormLink';
import AddTextIcon from 'react-icons/lib/fa/quote-right';
import ArrowUp from 'react-icons/lib/fa/sort-asc';
import ArrowDown from 'react-icons/lib/fa/sort-desc';

class AllPosts extends Component {
	// state = {
	// 	value: 'most-voted'
	// };

	upvote = (postId) => {
		// e.preventDefault();
		console.log(postId);
		this.props.votePosts(postId, 'upVote');
	}

	downvote = (postId) => {
		// e.preventDefault();
		console.log(postId);
		this.props.votePosts(postId, 'downVote');
	}

	handleSubmit = (event) => {
		event.preventDefault();
	}

	handleChange = (event) => {
		// this.setState({value: event.target.value});
		console.log(event.target.value);
		const newOrder = event.target.value;
		this.props.sortPosts(newOrder);

	}

	// sortPosts = (event.target.value, arr, obj) => {
	// 	switch(value) {
	// 		case 'most-voted':
	// 			arr.sort(function(a, b) { return obj[b].voteScore - obj[a].voteScore})
	// 		case 'most-recent':
	// 			return arr.sort(function(a, b) { return obj[a].timestamp - obj[b].timestamp})
	// 		default:
	// 			return arr;
	// 	}
	// }

	render() {
		// const { ids, thePosts, sortOrder } = posts;
		console.log(this.props);
		console.log(this.props.posts);


		// console.log(this.props.posts.allPosts);

		console.log(this.props.sortedIds);

		/*
     * Extract properties from props.
     */

    // Extract posts passed via props.
    const posts = this.props.posts;
    const sortedIds = this.props.sortedIds;
    // const allStoredPostsContents = posts.posts;


    // return (
    // 	<div>
    // 		<div className='sort-select-form'>
	   //    	<form onSubmit={this.handleSubmit}>
	   //    		<label>
	   //    			Sort posts by: {' '}
	   //    		</label>
	   //    		<select onChange={this.handleChange}>
	   //    			<option value='HIGHEST_POINTS'>highest points</option>
	   //    			<option value='LEAST_RECENT'>least recent</option>
	   //    			<option value='MOST_RECENT'>most recent</option>
	   //    		</select>
	   //    	</form>
	   //    </div>
    // 	</div>
    // )



    // const allPostsByVoteScoreIds = allStoredPostsIds.sort(function(a, b) { return allStoredPostsContents[b].voteScore - allStoredPostsContents[a].voteScore})
    // 	.map(post => post.id);

    // const allPostsByVoteScoreIds = this.sortPosts(this.state.value, allStoredPostsIds, allStoredPostsContents)
    // 	.map(post => post.id);

    // console.log(allStoredPostsContents);

		return (
			<div className='all-posts'>


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

export default AllPosts;