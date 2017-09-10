import generateUUID from '../utils/generateID.js';
import { getPosts, getComments, addToPosts, addToComments, getSinglePost, votePost } from '../utils/ReadableAPI';

/*
 * Action types.
 */

export const SET_CATEGORY = 'SET_CATEGORY';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';
export const ORDER_POSTS = 'ORDER_POSTS';

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
 * Get a data array of posts and return an object with a payload of all
 * the posts indexed by their id and an array of all the posts id.
 */
export function receiveAllPosts(data) {
	// Define an empty object to store the posts.
	let dataObj = {};
	// Loop through the posts data array.
	for (let i = 0; i < data.length; i++) {
		/*
		 * Populate the new posts object with post objects referenced.
		 * by their id.
		 */
		dataObj[data[i].id] = data[i];
		/*
		 * Add a comments property key which holds an empty array
		 * as value to each post object.
		 */
		dataObj[data[i].id].comments = [];
	}

	return {
		type: RECEIVE_ALL_POSTS,
		// Posts object.
		dataObj,
		// Posts ids array property.
		allPosts: data.map(post => post.id),
	};
};

/*
 * Get a data array of comments and the post parent id they refer to
 * and return an object with a payload of all the comments with that
 * same parent id stored as arry and the parent id.
 */
export function receiveAllComments(data, parentId) {
	// TODO check if get comments object from another action.
	// Define an empty object to store the comments.
	let dataObj = {};
	for (let i = 0; i < data.length; i++) {
		dataObj[data[i].id] = data[i];
	}
	// Declare an array to store the comments ids.
	let dataArray = data.map((item) => (
		item.id
	));

	return {
		type: RECEIVE_ALL_COMMENTS,
		// dataObj
		dataArray,
		parentId
	};
};

/*
 * Get a single post object as data and update the voteScore for a
 * single post.
 */
export function updatePostScore(data) {
	const postId = data.id;
	const postScore = data.voteScore;
	return {
		type: UPDATE_POST_SCORE,
		postId: postId,
		postScore: postScore
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
				data.allPosts.map(postItem => (
					// Get all the comments for the given `post` id from the server.
					getComments(postItem)
						// As comments objects are returned, dispatch an action to dispose of them.
						.then((data) => (
							// Pass the comments object and the post id to the function.
							dispatch(receiveAllComments(data, postItem))
						))
					))
				)
			);
	};
};

/*
 * Pass vote to the post with given postId. Vote can be either
 * positive or negative.
 */
export function addVoteToPost(postId, vote) {
	return function(dispatch) {
		return votePost(postId, { option: vote})
			.then(() => (
				getSinglePost(postId)
					.then((data) => (
						dispatch(updatePostScore(data))
					))
					.then(() => (
						getComments(postId)
						.then((data) => (
							dispatch(receiveAllComments(data, postId))
						))
					))
			))
	};
};


export function reorderPosts(newOrder) {
	return {
		type: ORDER_POSTS,
		newOrder
	}
}


// sortPosts = (value, arr, obj) => {
// 		switch(value) {
// 			case 'most-voted':
// 				return arr.sort(function(a, b) { return obj[b].voteScore - obj[a].voteScore})
// 			case 'most-recent':
// 				return arr.sort(function(a, b) { return obj[a].timestamp - obj[b].timestamp})
// 			default:
// 				return arr;
// 		}
// 	}


// TODO check

// See if it is useful
// export function getPostDetails(postId) {
// 	return function(dispatch) {
// 		return getSinglePost(postId)
// 			.then((data) => (
// 				// console.log(data)
// 				dispatch(receivePostDetails(data))
// 			))
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