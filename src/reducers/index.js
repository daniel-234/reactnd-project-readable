import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import the actions that need to be handled.
import {
	ADD_POST,
	// ADD_COMMENT
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
	selectedCategory: 'react',
	entities: {
		posts: {},
		comments: {}
	},
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

// Handle the ADD_POST action.
function addPost(state = initialState, action) {
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
				// Return the previous state (copying its enumerable properties).
				...state,
				// Modify the `entities` property with the passed in value.
				entities: {
					// Return the previous `entities` property from state.
					...state.entities,
					// Modify the `posts` property with the passed in value.
					posts: {
						// Return the previous `posts` property from state.
						...state.entities.posts,
						// Add the new post passed by the action.
						[id]: post
					}
				}
			};
		default:
			return state;
	}
}

// export default addPost;
export default combineReducers({
	addPost,
	form: formReducer
});