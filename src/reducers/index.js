import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import the actions that need to be handled.
import {
	allCategories,
	SET_CATEGORY,
	RECEIVE_ALL_POSTS,
	RECEIVE_ALL_COMMENTS,
	// RECEIVE_POST_DETAILS
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

	// TODO replace if an entities object is added with a comments object property.
	// entities: {
	// 	posts: {},
	// 	comments: {}
	// },
	posts: {},
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
	// postDetails: {}
};

/*
 * Define reducers to handle the imported actions.
 * A reducer is a pure function that takes the previous state and an
 * action and returns the next state.
 */

// Extract the React category.
const { REACT } = allCategories;

// Set the selected category.
function category(state = 'react', action) {
	switch (action.type) {
		case SET_CATEGORY:
			return action.category;
		default:
			return state;
	}
}


// Post reducer. Pass it the posts object state slice.

// TODO change the initial state if the comments object is added.
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
		default:
			return state;
	}
}


// TODO refactor it if a comments object is added as entity; delete otherwise.
// Comment reducer.
function comment(state = initialState.entities.post, action) {
	switch (action.type) {
		/*
		 * When all the posts from the server are received, return the
		 * new state with the entities posts object populated.
		 */
		case RECEIVE_ALL_COMMENTS:
			console.log(action.parentId)
			console.log(state);
			// const comments = action.dataObj;
			return {
				...state,
				// state[action.parentId]: {
				// 	...state[action.parentId],
					comments: [
						...action.dataArray
					]
				// }
			}
			// 	state.post: {
			// 		...state,
			// 		state.post[comments.parentId]: {
			// 			...state.post[comments.parentId],
			// 			...commentsByParentId: [
			// 				...
			// 			]
			// 		}
			// 	},
			// 	comments
			// }
		default:
			return state;
	}
}


// TODO uncomment it if a comments object is added.

// Combine reducers to compose the entities slice of state.
// const entities = combineReducers({
// 	post,
// 	comments: comment
// });


// Populate the `allPosts` array.
function allPosts(state = [], action) {
	switch(action.type) {
		case RECEIVE_ALL_POSTS:
			return [
				...action.allPosts
			];
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

// function postDetails(state = {}, action) {
// 	switch (action.type) {
// 		case RECEIVE_POST_DETAILS:
// 			console.log(action);
// 			const postDetails = action.postDetails;
// 			return {
// 				postDetails: postDetails
// 			}
// 		default:
// 			return state;
// 	}
// }


// Combine all the reducers responsible for separate portions of the state.
export default combineReducers({
	selectedCategory: category,
	posts: post,
	// entities,
	allPosts,
	postsByCategory,
	// postDetails,
	form: formReducer
});
