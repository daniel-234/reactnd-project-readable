import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import the actions that need to be handled.
import {
	allCategories,
	ADD_POST,
	ADD_COMMENT,
	SET_CATEGORY
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
		posts: {
			comments: []
		},
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

// Post reducer.
function post(state = initialState.entities.posts, action) {
	// Take properties from the action through object destructuring.
	console.log(action);
	const { post, id } = action;
	console.log(id);
	console.log(action.post);
	/*
	 * See 'Handling More Actions' paragraph in the 'Reducer' section
	 * in the Redux documentation.
	 */
	switch (action.type) {
		case ADD_POST:
			/*
			 * `We don't mutate state. We create a copy of it. Using the
			 * object spread operator, we can write { ...state, ...newState}`.
			 * [Reducers section in the Redux documentation]
			 */
			return {
				// Pass the previous state from posts.
				...state,
				// Add the new post passed by the action.
				[id]: post
			};
		default:
			return state;
	}
}

// Comment reducer.
function comment(state = initialState.entities.comments, action) {
	const { comment, id } = action;
	switch (action.type) {
		case ADD_COMMENT:
			return {
				// Pass the previous state from comments.
				...state,
				// Add the new comment passed by the action.
				[id]: comment
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

// AllPosts reducer.
function allPosts(state = initialState.allPosts, action) {
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
	postsByCategory,
	form: formReducer
});