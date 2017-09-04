import generateUUID from '../utils/generateID.js';
import { getPosts, getComments, addToPosts, addToComments } from '../utils/ReadableAPI';

/*
 * Action types.
 */

export const SET_CATEGORY = 'SET_CATEGORY';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';

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
 * Add a new post to the server, giving as its body the properties
 * returned from the spread operator plus the generated id.
 * Make use of the `getPosts` function from the ReadableAPI.
 */
export function addPost(post) {
	return function(dispatch) {
		// Generate a UUID for this post.
		const id = generateUUID();
		return addToPosts({ ...post, id: id });
	};
};

/*
 * Add a new comment to the server, giving as its body the properties
 * returned from the spread operator plus the generated id.
 * Make use of the `getComments` function from the ReadableAPI.
 */
export function addComment(comment) {
	return function(dispatch) {
		// Generate a UUID for this comment.
		const id = generateUUID();
		return addToComments({ ...comment, id: id });
	};
};

/*
 * Get the posts from calling `fetchAllPosts` and return an
 * action with an object reproducing all the posts indexed
 * by their id and an array of all the posts id.
 */
export function receiveAllPosts(data) {
	let dataObj = {};
	for (let i = 0; i < data.length; i++) {
		dataObj[data[i].id] = data[i];
	}
	return {
		type: RECEIVE_ALL_POSTS,
		dataObj,
		allPosts: data.map(post => post.id)
	};
};

/*
 * Get the comments from calling `fetchAllComments` and return
 * an action with an object reproducing all the comments indexed
 * by their id.
 */
export function receiveAllComments(data) {
	let dataObj = {};
	for (let i = 0; i < data.length; i++) {
		dataObj[data[i].id] = data[i];
	}
	return {
		type: RECEIVE_ALL_COMMENTS,
		dataObj
	};
};

/*
 * Fetch all the posts from the server.
 * Make use of the `getPosts` function from the
 * ReadableAPI.
 */
export function fetchAllPosts() {
	return function(dispatch) {
		return getPosts().then((data) => (
			dispatch(receiveAllPosts(data))
		));
	};
};

/*
 * Fetch all the comments from the server.
 * Make use of the `getComments` function from the
 * ReadableAPI.
 */
export function fetchAllComments() {
	return function(dispatch) {
		return getComments().then((data) => (
			dispatch(receiveAllComments(data))
		));
	};
};

/*
 * Set the category view.
 */
export function setCategory(category) {
	return {
		type: SET_CATEGORY,
		category
	};
};