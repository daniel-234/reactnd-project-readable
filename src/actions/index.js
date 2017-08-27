/*
 * Action types.
 */

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';

/*
 * Action creators.
 */

export function addPost({ post }) {
	return {
		type: ADD_POST,
		post
	};
};

export function addComment({ comment }) {
	return {
		type: ADD_COMMENT,
		comment
	};
};