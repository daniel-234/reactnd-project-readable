/*
 * Action types.
 */

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';

/*
 * Action creators.
 */

export function addPost({ post }) {
	var id = Math.random() * 1000;
	return {
		type: ADD_POST,
		post,
		id
	};
};

export function addComment({ comment }) {
	return {
		type: ADD_COMMENT,
		comment
	};
};