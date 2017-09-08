import React, { Component } from 'react';

class Category extends Component {
	render() {
		/*
     * Extract properties from props.
     */

    // Extract posts passed via props.
		const posts = this.props.posts;
    const allStoredPostsIds = posts.allPosts;
    const allStoredPostsContents = posts.posts;
    const setCommentvalues = this.props.setCommentvalues;
    const selectedCategory = this.props.selectedCategory;
    console.log(selectedCategory);

		return (
			<div className='category-related-posts'>
				<h2>{selectedCategory} {' Posts'} </h2>
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
            {allStoredPostsIds.filter((postId) => (
            		// Hardcode the selected category for now.
            		allStoredPostsContents[postId].category === selectedCategory
            	)).map((postId) => (
              <li key={postId} className='single-post'>
                <div className='post-details'>
                  <p className='post-title'>
                    { allStoredPostsContents[postId].title }
                  </p>
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

export default Category;