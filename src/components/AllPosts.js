import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import PostFormLink from './PostFormLink';
import AddTextIcon from 'react-icons/lib/fa/quote-right';
import ArrowUp from 'react-icons/lib/fa/sort-asc';
import ArrowDown from 'react-icons/lib/fa/sort-desc';

class AllPosts extends Component {
	render() {
		console.log(this.props.posts);

		/*
     * Extract properties from props.
     */

    // Extract posts passed via props.
    const posts = this.props.posts;
    const allStoredPostsIds = posts.allPosts;
    const allStoredPostsContents = posts.posts;

    console.log(allStoredPostsContents);

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
            {allStoredPostsIds.map((postId) => (
              <li key={postId} className='single-post'>
              	<div className='post-voting-icons'>
            			<ArrowUp
            				className='up=arrow'
            				size={20}
            				onClick={() => (
            					console.log('Up')
            				)}
            			/>
            			<ArrowDown
            				className='down-arrow'
            				size={20}
            				onClick={() => (
            					console.log('Down')
            				)}
            			/>
              	</div>
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
		            		to={'/' + allStoredPostsContents[postId].category + '/' + postId}
		            	>
	                  <p className='post-title'>
	                    { allStoredPostsContents[postId].title }
	                  </p>
                  </Link>
                  <p className='post-author'>
                    author: { allStoredPostsContents[postId].author }
                  </p>
                  <p className='post-separator'>
                    |
                  </p>
                  <p className='post-score'>
                    { allStoredPostsContents[postId].voteScore } points
                  </p>
                  <p className='post-separator'>
                    |
                  </p>
                  <p className='post-comments'>
                    { allStoredPostsContents[postId].comments.length } comments
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

export default AllPosts;