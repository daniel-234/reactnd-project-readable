import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import PostFormLink from './PostFormLink';
import AddTextIcon from 'react-icons/lib/fa/quote-right';

class AllPosts extends Component {
	// componentDidMount() {
 //    this.props.getAllPosts();
 //  }

	// // Triggered by onSubmit in the post form.
 //  submitPost = (values) => {
 //    console.log(values);
 //    /*
 //     * Call the `displayPost` property function passed
 //     * to props by `mapDispatchToProps`.
 //     * Get the values from the post form and dispatch the
 //     * action `addPost` from the reducer passing the post
 //     * object as argument.
 //     */
 //    this.props.setPostValues({
 //        title: values.title,
 //        author: values.author,
 //        category: values.category,
 //        body: values.body,
 //    });

 //    /*
 //     * After the new post is submitted, get the state synchronized
 //     * with the server.
 //     */
 //    this.props.getAllPosts();
 //    // this.props.getAllComments();
 //  }


 //  // TODO refactor

 //  // Triggered by onSubmit in the comment form.
 //  submitComment = (values) => {
 //    /*
 //     * Call the `displayComment` property function passed
 //     * to props by `mapDispatchToProps`.
 //     * Get the values from the comment form and dispatch the
 //     * action `addComment` from the reducer passing the comment
 //     * object and the related post id as arguments.
 //     */
 //    console.log(values);
 //    this.props.setCommentValues({
 //        body: values.comment,
 //        // For now just add comments to the same post.
 //        // TODO change it.
 //        parentId: values.allPosts
 //    });
 //    // Get the comments from the server.
 //    // this.props.getAllComments();
 //  }

  // // Get all the submitted posts from any category.
  // getThePosts = () => {
  //   const allPosts = this.props.posts.allPosts;
  //   return allPosts;
  // }

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