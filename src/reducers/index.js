import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import the actions that need to be handled.
import {
	allCategories,
	ADD_POST,
	ADD_COMMENT,
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

// Define a reducer managing selectCategory.
function category(state = 'react', action) {
	switch (action.type) {
		case SET_CATEGORY:
			return action.category;
		default:
			return state;
	}
}


// initialState.entities.posts

// Post reducer. Pass the posts object from entities as its state slice.
function post(state = initialState.entities.posts, action) {
	console.log(action.dataObj);
	/*
	 * See 'Handling More Actions' paragraph in the 'Reducer' section
	 * in the Redux documentation.
	 */
	switch (action.type) {
		case RECEIVE_ALL_POSTS:
			const posts = action.dataObj;
			return {
				...posts
			};
		case ADD_POST:
			// Take properties from the action through object destructuring.
			const { post } = action;
			console.log(action);
			/*
			 * `We don't mutate state. We create a copy of it. Using the
			 * object spread operator, we can write { ...state, ...newState}`.
			 * [Reducers section in the Redux documentation]
			 */
			return {
				// Pass the previous state from posts.


				// Add the new post passed by the action.


				...state,
				// [id]: {
				// ...post,
				// id: id


			// }

				// [post.id]: {
				// 	...post,
				// 	 // Add a `comments` porperty to the post object to handle all
				// 	 // the comments related to that post.

				// 	comments: []
				// }

			};
		case ADD_COMMENT:
			// Take properties from the action through object destructuring.
			const { comment, postId, commentId } = action;
				return {
				...state,
				// Get the post correspondent to the given post id.
				[postId]: {
					// Pass it the previous state.
					...state[postId],
					// Take the comments property.
					comments: [
						// Pass it the comments that were previously in the array.
						...state[postId].comments,
						// Add the new comment id.
						commentId
					]
				}
			};
		default:
			return state;
	}
}

// Comment reducer.
function comment(state = initialState.entities.comments, action) {
	const { comment, postId, commentId } = action;
	// console.log(action);

	switch (action.type) {
		case RECEIVE_ALL_COMMENTS:
			const comments = action.dataObj;
			// console.log(action);
			return {
				...comments
			}
		case ADD_COMMENT:
			return {
				// Pass the previous state from comments.
				...state,
				// Add the new comment passed by the action.
				[commentId]: comment
			};
		default:
			return state;
	}
}

// Combine reducers to compose the entities slice of state.
const entities = combineReducers({
	posts: post,
	comments: comment
});



// TODO delete.

// Old reducer that populated the `allPosts` array synchronously
// without querying the API.
// AllPosts reducer.
function receiveAllPosts(state = initialState.allPosts, action) {
	const { post, id } = action;
	switch (action.type) {
		case ADD_POST:
			// Return a new `allPosts` array.
			return [
				// Pass the previous state.
				...state,
				// Add the id of the new post.
				id
			];
		default:
			return state;
	}
}



// Reducer that queries the API.
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
		case ADD_POST:
			// Return a new `postsByCategory` object.
			return {
				// Pass the previous state.
				...state,
				// Select the post category.
				[post.category]: {
					// Assign it an `items` property key.
					items: [
						// Pass it the old `items` array elements.
						...state[post.category].items,
						// Add the new post id.
						id
					]
				}
			};
		default:
			return state;
	}
}

// Combine all the reducers responsible for separate portions of the state.
export default combineReducers({
	selectedCategory: category,
	entities,
	allPosts,
	// receiveAllPosts,
	// postsByCategory,
	form: formReducer
});