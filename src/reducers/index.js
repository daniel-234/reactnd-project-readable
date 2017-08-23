// Import both the constants from actions.
import {
	ADD_POST,
	REMOVE_POST
} from '../actions';

// Shape of our initial state.
// The first time our reducer is called,
// it's going to be called with a state of
// undefined and then we will go ahead and set
// our initial state to this object.
const initialCategoriesState = {
	react: [],
	redux: [],
	udacity: []
};

// Reducer that will set the state to the constant defined
// above if the state is undefined.
function categoryPosts(state = initialCategoriesState, action) {
	// Take some properties from our action.
	const { category, post } = action;

	// Specify how our state will change based on those actions.
	switch(action.type) {
		case ADD_POST:
			return {
				// Using object spread syntax, return the same state that
				// we had before.
				...state,
				// Modify the specific category passed by the action.
				[category]: [
					// state at this specific category is going to remain the same.
					...state[category],
					// Just add the given post.
					post
				]
			};
		case REMOVE_POST:
			return {
				...state,
				[category]: {
					...state[category],
					[post]: null
				}
			};
		default:
			return state;
	}
}

export default categoryPosts;