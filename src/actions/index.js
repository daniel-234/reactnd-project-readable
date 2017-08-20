// Define constants to avoid relying on string comparisons everywhere.
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';

// Action creator to add a post to a specific category.
export function addPost({ category, post }) {
	return {
		type: ADD_POST,
		category,
		post
	};
};

// Action creator to delete a specific post.
export function removePost({ post }) {
	return {
		type: REMOVE_POST,
		post
	};
};