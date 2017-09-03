import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import the actions that need to be handled.
import {
	allCategories,
	SET_CATEGORY,
	RECEIVE_ALL_POSTS,
	RECEIVE_ALL_COMMENTS
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
	entities: {
		posts: {},
		comments: {}
	},
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
	}
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

// Post reducer. Pass it the entities posts object state slice.
function post(state = initialState.entities.posts, action) {
	switch (action.type) {
		/*
		 * When all the posts from the server are received, return the
		 * new state with the entities posts object populated.
		 */
		case RECEIVE_ALL_POSTS:
			const posts = action.dataObj;
			return {
				...posts
			};


		// TODO delete later
		// Keep the following commented code to reproduce the steps taken
		// previously when dealing with adding a comment.
		// case ADD_COMMENT:
		// 	// Take properties from the action through object destructuring.
		// 	const { comment, postId, commentId } = action;
		// 		return {
		// 		...state,
		// 		// Get the post correspondent to the given post id.
		// 		[postId]: {
		// 			// Pass it the previous state.
		// 			...state[postId],
		// 			// Take the comments property.
		// 			comments: [
		// 				// Pass it the comments that were previously in the array.
		// 				...state[postId].comments,
		// 				// Add the new comment id.
		// 				commentId
		// 			]
		// 		}
		// 	};


		default:
			return state;
	}
}

// Comment reducer.
function comment(state = initialState.entities.comments, action) {
	switch (action.type) {
		/*
		 * When all the posts from the server are received, return the
		 * new state with the entities posts object populated.
		 */
		case RECEIVE_ALL_COMMENTS:
			const comments = action.dataObj;
			return {
				...comments
			}
		default:
			return state;
	}
}

// Combine reducers to compose the entities slice of state.
const entities = combineReducers({
	posts: post,
	comments: comment
});

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

// Assign the given post id to its category.
function postsByCategory(state = initialState.postsByCategory, action) {
	const { post, id } = action;
	switch (action.type) {
		// case ADD_POST:
		// 	// Return a new `postsByCategory` object.
		// 	return {
		// 		// Pass the previous state.
		// 		...state,
		// 		// Select the post category.
		// 		[post.category]: {
		// 			// Assign it an `items` property key.
		// 			items: [
		// 				// Pass it the old `items` array elements.
		// 				...state[post.category].items,
		// 				// Add the new post id.
		// 				id
		// 			]
		// 		}
		// 	};
		default:
			return state;
	}
}

// Combine all the reducers responsible for separate portions of the state.
export default combineReducers({
	selectedCategory: category,
	entities,
	allPosts,
	// postsByCategory,
	form: formReducer
});