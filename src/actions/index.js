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
 * Argument: post object returned by the form after a user has
 * submitted a new one.
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
 * Argument: comment object returned by the form after a user has
 * submitted a new one.
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
	console.log(data);
	let dataObj = {};
	// let comments = [];
	for (let i = 0; i < data.length; i++) {
		// dataObj[data[i].id] = data[i];
		// comments = fetchAllComments();
		// console.log(comments);
		dataObj[data[i].id] = data[i];  //, comments: comments };

	}
	console.log(dataObj);
	return {
		type: RECEIVE_ALL_POSTS,
		dataObj,
		// comments: fetchAllComments(),
		allPosts: data.map(post => post.id)
	};
};

/*
 * Get the comments from calling `fetchAllComments` and return
 * an action with an object reproducing all the comments indexed
 * by their id.
 */
// export function receiveAllComments1(data) {
// 	console.log(data);
// 	let dataObj = {};
// 	for (let i = 0; i < data.length; i++) {
// 		dataObj[data[i].id] = data[i];
// 	}
// 	return {
// 		type: RECEIVE_ALL_COMMENTS,
// 		dataObj
// 		// data
// 	};
// };


/*
 * Get the comments from calling `fetchAllComments` and return
 * an action with an object reproducing all the comments indexed
 * by their id.
 */
export function receiveAllComments(data, postId) {
	const parentId = postId;
	console.log(data);
	console.log(parentId);

	let dataObj = {};
	for (let i = 0; i < data.length; i++) {
		dataObj[data[i].id] = data[i];
	}

	let dataArray = data.map((item) => (
		item.id
	));

	console.log(dataArray);

	return {
		type: RECEIVE_ALL_COMMENTS,
		// dataObj
		// data
		dataArray,
		parentId
	};
};



/*
 * Fetch all the posts from the server.
 * Make use of the `getPosts` and `getComments` functions from
 * the ReadableAPI.
 */
export function fetchAllPosts() {
	return function(dispatch) {
		// Get all the posts from the server.
		return getPosts()
			// As data are returned, dispatch an action to dispose of them.
			.then((data) => (
				dispatch(receiveAllPosts(data))
			))
			// Take the allPosts array and return a new one based on its `post` ids items.
			.then((data) => (
				// console.log(data)
				data.allPosts.map(postItem => (
					// Get all the comments for the given `post` id from the server.
					getComments(postItem)
						// As comments objects are returned, dispatch an action to dispose of them.
						.then(data => (
							// Pass the comments object and the post id to the function.
							dispatch(receiveAllComments(data, postItem))
						))
					))

			// data.allPosts.map((postItem) => //console.log(postItem))  //fetchAllComments(postItem))
			// 	getComments(postItem.id)).then((data) => (
			// dispatch(receiveAllComments(data))
			// ))
				)
			);
		// ));
		// fetchAllComments();
	};
};

/*
 * Fetch all the comments from the server.
 * Make use of the `getComments` function from the
 * ReadableAPI.
 */
// export function fetchAllComments() {
// 	return function(dispatch) {
// 		return getComments('8xf0y6ziyjabvozdd253nd').then((data) => (
// 			dispatch(receiveAllComments(data))
// 		));
// 	};
// };

/*
 * Set the selected category.
 */
export function setCategory(category) {
	return {
		type: SET_CATEGORY,
		category
	};
};