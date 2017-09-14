import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import the actions that need to be handled.
import {
	allCategories,
	sortingTypes,
	SET_CATEGORY,
	RECEIVE_ALL_POSTS,
	RECEIVE_ALL_COMMENTS,
	UPDATE_POST_SCORE,
	UPDATE_COMMENT_SCORE,
	UPDATE_POSTS_VISIBILITY,
	UPDATE_COMMENTS_VISIBILITY,
	ORDER_POSTS,
	CHANGE_SORTING_ORDER
} from '../actions';

/*
 * Initial state of the application.
 *
 * Following the Redux documentation, it was found that the shape
 * of the application state had to adhere to the rules of normalizing
 * data.
 * This way, although more components are connected, each one is
 * responsible for looking up its own data.
 * To avoid reducers having to deal with large amounts of data and to
 * optimize UI performance, connected parent components will simply pass
 * item ids to connected children.
 * To organize normalized data in state as suggested in the Redux guide,
 * it was followed the pattern of putting the relational 'tables' under
 * a common parent key, named 'entities'.
 */
const initialState = {
	selectedCategory: allCategories.REACT,
	sortOrder: sortingTypes.MOST_RECENT,
	posts: {},
	comments: {},
	allPosts: [],
	postsByCategory: {
		react: {
			items: []
		},
		redux: {
			items: []
		},
		udacity: {
			items: []
		}
	},
};

/*
 * Define reducers to handle the imported actions.
 * A reducer is a pure function that takes the previous state and an
 * action and returns the next state.
 */

// Extract the React category.
const { REACT } = allCategories;

const { HIGHEST_POINTS } = sortingTypes;

// Set the selected category.
function category(state = 'react', action) {
	switch (action.type) {
		case SET_CATEGORY:
			return action.category;
		default:
			return state;
	}
}

// Change the sorting order of the posts.
function sortOrder(state = initialState.sortOrder, action) {
	switch (action.type) {
		case CHANGE_SORTING_ORDER:
			console.log(action.sortOrder);
			return action.sortOrder;
		default:
			return state;
	}
}

// Post reducer. Pass it the posts object state slice.
function post(state = initialState, action) {
	switch (action.type) {
		/*
		 * When all the posts from the server are received, return the
		 * new state with the posts object populated.
		 */
		case RECEIVE_ALL_POSTS:
			const posts = action.dataObj;
			return {
				...posts
			};
		/*
		 * When all the comments from the server are received, return the
		 * new state with a comments ids array as property inside each post
		 * object they refer to.
		 */
		case RECEIVE_ALL_COMMENTS:
			const parentId = action.parentId;
			const comments = action.dataArray;
			return {
				...state,
				[parentId]: {
					...state[parentId],
					// Populate the `comments` property of this post.
					comments: [
						...comments
					]
				}
			};
		// Update the `voteScore` for a single post.
		case UPDATE_POST_SCORE:
			const postId = action.postId;
			const postScore = action.postScore;
			return {
				...state,
				[postId]: {
					...state[postId],
					// Change the post score.
					voteScore: postScore
				}
			};


			case UPDATE_POSTS_VISIBILITY:
			return [
				...action.allPosts
			]


		case UPDATE_COMMENTS_VISIBILITY:
			const commentsIds = action.commentsIds;
			const parentPostId = action.parentPostId;
			console.log(parentPostId);
			console.log(commentsIds);
			return {
				...state,
				[parentPostId]: {
					...state[parentPostId],
					comments: [
						...commentsIds
					]
				}
			}
		default:
			return state;
	}
}

// Comments reducer.
function comments(state = initialState.comments, action) {
	switch (action.type) {
		/*
		 * When all the comments from the server are received, return the
		 * new state with the comments object populated.
		 */
		case RECEIVE_ALL_COMMENTS:
			const comments = action.dataObj;
			// Return the state as it was before, adding the new comments.
			return {
				...state,
				...comments
			};
		// Update the `voteScore` for a single comment.
		case UPDATE_COMMENT_SCORE:
			const commentId = action.commentId;
			const commentScore = action.commentScore;
			return {
				// Return the state as it was before.
				...state,
				// Get the single comment that was voted.
				[commentId]: {
					...state[commentId],
					// Change the comment score.
					voteScore: commentScore
				}
			}
		default:
			return state;
	}
}

// Populate the `allPosts` array.
function allPosts(state = [], action) {
	switch(action.type) {
		case RECEIVE_ALL_POSTS:
			return [
				...action.allPosts
			];
		/*
		 * When the following action gets triggered by a user who deleted
		 * a post, we just update the `allPosts` array to filter out the
		 * deleted posts.
		 */
		case UPDATE_POSTS_VISIBILITY:
			return [
				...action.allPosts
			]
		default:
			return state;
	}
}

// TODO refector it.
// Assign the given post id to its category.
function postsByCategory(state = initialState.postsByCategory, action) {
	switch (action.type) {
		case RECEIVE_ALL_POSTS:
			const posts = action.dataObj;
			const postsIds = action.allPosts;

			// Return a new `postsByCategory` object.
			return {
				// Pass the previous state.
				react: {
					items: postsIds.filter((postId) => (
						posts[postId].category === 'react'
					))
				},
				redux: {
					items: postsIds.filter((postId) => (
						posts[postId].category === 'redux'
					))
				},
				udacity: {
					items: postsIds.filter((postId) => (
						posts[postId].category === 'udacity'
					))
				}
			};
		default:
			return state;
	}
}

// Combine all the reducers responsible for separate portions of the state.
export default combineReducers({
	selectedCategory: category,
	sortOrder,
	posts: post,
	comments: comments,
	allPosts,
	postsByCategory,
	form: formReducer
});
