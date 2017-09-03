// ID generator function.
import generateUUID from '../utils/generateID.js';


const api = process.env.REACT_APP_PROJECT_READABLE_API_URL || 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}




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
 */
export function addNewPost(post) {
	return function(dispatch) {
		// Generate a UUID for this post.
		const id = generateUUID();
		return fetch(`${api}/posts`, {
			method: `POST`,
			headers: {
				...headers,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...post, id: id })
		}).then(res => res.json())
	};
};

/*
 * Add a new comment to the server, giving as its body the properties
 * returned from the spread operator plus the generated id.
 */
export function addNewComment(comment) {
	return function(dispatch) {
		// Generate a UUID for this comment.
		const id = generateUUID();
		return fetch(`${api}/comments`, {
			method: `POST`,
			headers: {
				...headers,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...comment, id: id })
		}).then(res => res.json())
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
 */
export function fetchAllPosts() {
	return function(dispatch) {
		return fetch(`${api}/posts`, { headers })
	    .then(
	    	res => res.json(),
	    	error => console.log('An error occurred', error))
	    .then(data => dispatch(receiveAllPosts(data)))
	};
};

/*
 * Fetch all the comments from the server.
 */
export function fetchAllComments() {
	return function(dispatch) {
		return fetch(`${api}/posts/8xf0y6ziyjabvozdd253nd/comments`, { headers })
	    .then(
	    	res => res.json(),
	    	error => console.log('An error occurred', error))
	    .then(data => dispatch(receiveAllComments(data)))
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