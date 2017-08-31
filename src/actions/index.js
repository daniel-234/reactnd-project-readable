// ID generator function.
import generateUUID from '../utils/generateID.js';

/*
 * Action types.
 */

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const SET_CATEGORY = 'SET_CATEGORY';
// export const ADD_COMMENT_TO_POST = 'ADD_COMMENT_TO_POST';

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

export function addComment({ comment, postId }) {
	const commentId = generateUUID();
	return {
		type: ADD_COMMENT,
		comment,
		postId,
		commentId
	};
};

// export function addCommentToPost({ postId, commentId }) {
// 	return {
// 		type: ADD_COMMENT_TO_POST,
// 		postId,
// 		commentId
// 	};
// }

export function setCategory(category) {
	return {
		type: SET_CATEGORY,
		category
	};
};