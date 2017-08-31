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

export function addPost({ post }) {
	const id = generateUUID();
	return {
		type: ADD_POST,
		post,
		id
	};
};

export function addComment({ comment }) {
	const id = generateUUID();
	return {
		type: ADD_COMMENT,
		comment,
		id
	};
};

export function setCategory(category) {
	return {
		type: SET_CATEGORY,
		category
	};
};