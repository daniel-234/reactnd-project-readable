// ID generator function.
import generateUUID from '../utils/generateID.js';

/*
 * Action types.
 */

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const SET_CATEGORY = 'SET_CATEGORY';

/*
 * Other constants.
 */

export const allCategories = {
	REACT: 'REACT',
	REDUX: 'REDUX',
	UDACITY: 'UDACITY'
};

/*
 * Action creators.
 */

/*
 * Action that takes as argument an object passed from the
 * post form with the post properties.
 */
export function addPost({ post }) {
	const id = generateUUID();
	return {
		type: ADD_POST,
		post,
		id
	};
};

/*
 * Action that takes as arguments a comment and a post id
 * passed from the comment form.
 */
export function addComment({ comment, postId }) {
	const commentId = generateUUID();
	return {
		type: ADD_COMMENT,
		comment,
		postId,
		commentId
	};
};

export function setCategory(category) {
	return {
		type: SET_CATEGORY,
		category
	};
};