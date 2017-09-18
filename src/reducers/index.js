import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import the actions that need to be handled.
import {
	allCategories,
	sortingTypes,
	GET_CATEGORIES,
	RECEIVE_ALL_POSTS,
	RECEIVE_ALL_COMMENTS,
	INSERT_POST,
	INSERT_COMMENT,
	UPDATE_POST,
	UPDATE_COMMENT,
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
	categories: [],
	sortOrder: sortingTypes.MOST_RECENT,
	posts: {},
	comments: {},
	allPosts: [],
	postsByCategory: {},
};

/*
 * Define reducers to handle the imported actions.
 * A reducer is a pure function that takes the previous state and an
 * action and returns the next state.
 */


// Set the selected category.
function categories(state = [], action) {
	switch (action.type) {
		case GET_CATEGORIES:
			console.log(action);
			return action.categories;
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
function post(state = initialState.posts, action) {
	const parentId = action.parentId;
	const postId = action.postId;
	const post = action.post;
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
		// case INSERT_POST:
		// 	console.log(state)
		// 	return {
		// 		...state,
		// 		[postId]: post
		// 	}
		case INSERT_COMMENT:
			console.log(parentId)
			return {
				...state,
				[parentId]: {
					...state[parentId],
					comments: [
						...state[parentId].comments,
						action.commentId
					]
				}
			}
		case UPDATE_POST:
			return {
				...state,
				[postId]: {
					...state[postId],
					title: action.title,
					category: action.category,
					body: action.body
				}
			};
		// Update the `voteScore` for a single post.
		case UPDATE_POST_SCORE:
			const postScore = action.postScore;
			return {
				...state,
				[postId]: {
					...state[postId],
					// Change the post score.
					voteScore: postScore
				}
			};

		// case UPDATE_POSTS_VISIBILITY:
		// 	console.log(action.allPosts)
		// 	return [
		// 		...action.allPosts
		// 	];

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
	const commentId = action.commentId;
	// const comment = action.comment;
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
		case INSERT_COMMENT:
			// console.log(parentId)
			return {
				...state,
				[commentId]: action.comment
			}
		case UPDATE_COMMENT:
			console.log(action);
			return {
				...state,
				[commentId]: {
					...state[commentId],
					timestamp: action.timestamp,
					body: action.body
				}
			};

		// Update the `voteScore` for a single comment.
		case UPDATE_COMMENT_SCORE:
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
	const postId = action.postId;
	switch(action.type) {
		case RECEIVE_ALL_POSTS:
			return [
				...action.allPosts
			];
		// case INSERT_POST:
		// 	console.log(state);
		// 	console.log(action);
		// 	return [
		// 		...state,
		// 		postId
		// 	];

		/*
		 * When the following action gets triggered by a user who deleted
		 * a post, we just update the `allPosts` array to filter out the
		 * deleted posts.
		 */
		case UPDATE_POSTS_VISIBILITY:
			return [
				...action.allPosts
			];
		default:
			return state;
	}
}

// TODO refector it.
// Assign the given post id to its category.
function postsByCategory(state = initialState, action) {
	const categories = action.categories;
	let categoriesState = {};
	switch (action.type) {
		case GET_CATEGORIES:
			// const categoriesState = {};
			categories.map((category) => {
				categoriesState[category] = {
					items: []
				}
			})
			return categoriesState;

		case RECEIVE_ALL_POSTS:
			const posts = action.dataObj;
			const postsIds = action.allPosts;

			let categoriesArray = [];
			for (const category in state) {
				categoriesArray.push(category);
			}

			categoriesArray.map((category) => {
				categoriesState[category] = {
					items:
						postsIds.filter((postId) => (
							posts[postId].category === category
						))
				}
			})

			return categoriesState;

		// case INSERT_POST:
		// 	console.log(state)


		default:
			return state;
	}
}

// Combine all the reducers responsible for separate portions of the state.
export default combineReducers({
	categories,
	sortOrder,
	posts: post,
	comments: comments,
	allPosts,
	postsByCategory,
	form: formReducer
});
