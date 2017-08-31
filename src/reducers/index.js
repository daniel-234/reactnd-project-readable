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

// Define a reducer managing just visibilityFilter.
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


				// Modify the `posts` property with the passed in value.
				posts: {
					// Return the previous `posts` property from state.
					...state,
					// Add the new post passed by the action.
					[id]: post,
				}
			}



			// 		// comments: state.entities.posts.comments.concat(id)
			// 	},
			// 	comments: {
			// 		...state.entities.comments,
			// 		[id]: post.comment
			// 	}



			// 	// Return the previous state (copying its enumerable properties).
			// 	...state,
			// 	// Modify the `entities` property with the passed in value.
			// 	entities: {
			// 		// Return the previous `entities` property from state.

			// 		// ...state.entities,

			// 		// Modify the `posts` property with the passed in value.
			// 		posts: {
			// 			// Return the previous `posts` property from state.
			// 			...state.entities.posts,
			// 			// Add the new post passed by the action.
			// 			[id]: post,


			// 			// comments: state.entities.posts.comments.concat(id)
			// 		},
			// 		comments: {
			// 			...state.entities.comments,
			// 			[id]: post.comment
			// 		}
			// 	},
			// 	allPosts: state.allPosts.concat(id),
			// 	// Assign the post id to the right category.
			// 	postsByCategory: {
			// 		// Return the previous categories.
			// 		...state.postsByCategory,
			// 		// Get the category key from the post.
			// 		[post.category]: {
			// 			// Add the new id to the items collection.
			// 			items: state.postsByCategory[post.category].items.concat(id)
			// 		}

			// 	}
			// };


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

				// ...state,
				// entities: {
				// 	posts: {
				// 		...state.entities.posts,
				// 		comments: state.entities.posts.comments.concat(id)
				// 	},

					comments: {
						...state,
						[id]: comment
					}
				};
			// }
		default:
			return state;
	}
}

const entities = combineReducers({
	posts: post,
	comments: comment
});

function allPosts(state = initialState.allPosts, action) {
	const { post, id } = action;
	switch (action.type) {
		case ADD_POST:
			return {
				allPosts: initialState.allPosts.concat(id)
			};
		default:
			return state;
	}
}


function postsByCategory(state = initialState.postsByCategory, action) {
	switch (action.type) {
		default:
			return state;
	}
}

export default combineReducers({
	selectedCategory: category,
	entities,
	allPosts,
	postsByCategory,

	// post,
	// comment,
	form: formReducer
});