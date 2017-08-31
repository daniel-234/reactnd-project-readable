import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Import the actions that need to be handled.
import {
	allCategories,
	ADD_POST,
	ADD_COMMENT,
	SET_CATEGORY,
	ADD_COMMENT_TO_POST
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
			// comments: []
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

// TODO
// Delete commented out code. Added and removed code while studying
// the Redux docs about updating normalized data, while working on
// posts and comments.
// Updating a comment should push a comment id in the related post
// and that has forced me to work on the slice reducer composition.

// Post reducer.
function post(state = initialState.entities.posts, action) {
	// Take properties from the action through object destructuring.
	console.log(action);
	// const { post, id } = action;

	console.log(action.id);
	console.log(action.post);
	/*
	 * See 'Handling More Actions' paragraph in the 'Reducer' section
	 * in the Redux documentation.
	 */
	switch (action.type) {
		case ADD_POST:
			const { post, id } = action;
			/*
			 * `We don't mutate state. We create a copy of it. Using the
			 * object spread operator, we can write { ...state, ...newState}`.
			 * [Reducers section in the Redux documentation]
			 */
			return {
				// Pass the previous state from posts.
				...state,
				// Add the new post passed by the action.
				[id]: {
					...post,
					comments: []
				}
			};
		case ADD_COMMENT:
			const { comment, postId, commentId } = action;

			// if (state[postId].comments.length > 0) {
				return {
				...state,
				[postId]: {
					...state[postId],
					comments: [
						...state[postId].comments,
						commentId
						// commentId
					]
					// comments: [
					// 	...state[postId].comments,
					// 	commentId
					// ]   //,
					// postId
				}

				// ...state,
				// [postId]: {
				// 	...state[postId],
				// 	comments: [
				// 		...state[postId].comments,
				// 		commentId
				// 	]
				// }

					// ...state.comments,
					// commentId
				// ]
			}
		// }
		// else {
		// 	return commentId;
		// }

			// return {
			// 	...state,
			// 	[postId]: {
			// 		...state[postId],
			// 		comments: [
			// 			...state[postId].comments
			// 			// commentId
			// 		]
			// 		// comments: [
			// 		// 	...state[postId].comments,
			// 		// 	commentId
			// 		// ]   //,
			// 		// postId
			// 	}

			// 	// ...state,
			// 	// [postId]: {
			// 	// 	...state[postId],
			// 	// 	comments: [
			// 	// 		...state[postId].comments,
			// 	// 		commentId
			// 	// 	]
			// 	// }

			// 		// ...state.comments,
			// 		// commentId
			// 	// ]
			// } : return {
			// 	commentId
			// }
		default:
			return state;
	}
}

// function commentsToPost(state = [], action) {
// 	const { comment, id } = action;
// 	switch (action.type) {
// 		case ADD_COMMENT:
// 			return [
// 				...state,
// 					id
// 				];
// 		default:
// 			return state;
// 	}
// }

// const postReducer = combineReducers({
// 	postEntry,
// 	// commentsToPost
// });

// Comment reducer.
function comment(state = initialState.entities.comments, action) {
	const { comment, postId, commentId } = action;

	// const post = state.posts[postId];

	switch (action.type) {
		case ADD_COMMENT:
			return {
				// Pass the previous state from comments.
				...state,
				// Add the new comment passed by the action.
				[commentId]: comment


				// posts: {
				// 	...state,
				// 	[id]: {
				// 		...state,
				// 		comments: [
				// 			...state,
				// 			comment
				// 		]
				// 	}
				// },
				// comments: {
				// 	...state,
				// 	[id]: comment
				// }
			};
		default:
			return state;
	}
}

// function allComments(state = initialState.entities.posts.comments, action) {
// 	const { comment, id } = action;
// 	switch (action.type) {
// 		case ADD_COMMENT:
// 			return [
// 				...state,
// 				id
// 			]
// 		default:
// 			return state;
// 	}
// }

// Combine reducers to compose the entities slice of state.
const entities = combineReducers({
	posts: post,
	comments: comment
});

// function entities(state = {}, action)

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