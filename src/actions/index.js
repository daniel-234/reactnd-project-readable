import generateUUID from '../utils/generateID.js';

import {
	getCategories,
	getPosts,
	getComments,
	addToPosts,
	addToComments,
	getSinglePost,
	getSingleComment,
	votePost,
	voteComment,
	editPost,
	editComment,
	deletePost,
	deleteComment
} from '../utils/ReadableAPI';

/*
 * Action types.
 */

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const INSERT_POST = 'INSERT_POST';
export const INSERT_COMMENT = 'INSERT_COMMENT';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';
export const ORDER_POSTS = 'ORDER_POSTS';
export const CHANGE_SORTING_ORDER = 'CHANGE_SORTING_ORDER';
export const UPDATE_POSTS_VISIBILITY = 'UPDATE_POSTS_VISIBILITY';
export const UPDATE_COMMENTS_VISIBILITY = 'UPDATE_COMMENTS_VISIBILITY';
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE';
export const FLAG_POST_AS_DELETED = 'FLAG_POST_AS_DELETED';

/*
 * Other constants.
 */

export const sortingTypes = {
	MOST_RECENT: 'MOST_RECENT',
	LEAST_RECENT: 'LEAST_RECENT',
	HIGHEST_POINTS: 'HIGHEST_POINTS',
	LOWEST_POINTS: 'LOWEST_POINTS'
};


/*
 * Action creators.
 */

/*
 * Fetch all the posts from the server.
 * Make use of the `getPosts` and `getComments` functions from
 * the ReadableAPI.
 */
export function fetchAllPosts() {
	return function(dispatch) {
		// dispatch(getCategories())
		// Get all the posts from the server.
		return getCategories()
			.then((data) => (
				dispatch(retrieveCategories(data))
			))
			.then(() => (
				getPosts()
			))
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
 * Retrieve the categories from the server.
 */
export function retrieveCategories(data) {
	const categories = data.categories.map((category) => (
		category.name
	));
	return {
		type: GET_CATEGORIES,
		categories
	};
};

/*
 * Change the sorting order for the visible posts.
 */
export function changeSortingOrder(sortOrder) {
	return {
		type: CHANGE_SORTING_ORDER,
		sortOrder
	}
}

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
		allPosts: data.filter((post) => (
			!post.deleted
		)).map((post) => post.id)
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
		dataObj,
		dataArray,
		parentId
	};
};

/*
 * Add a new post to the server, giving as its body the properties
 * returned from the spread operator plus the generated id.
 * Argument: post object returned by the form after a user has
 * submitted a new one.
 * Make use of the `getPosts` function from the ReadableAPI.
 */
export function addPostToServer(post) {
	return function(dispatch) {
		// Generate a UUID for this post.
		const id = generateUUID();
		const timestamp = Date.now();
		return addToPosts({ ...post, id: id, timestamp: timestamp })
			.then(() => (
				getSinglePost(id)
					.then((data) => (
						dispatch(insertPost(data))
					))
			));
	};
};

/*
 * Add a new comment to the server, giving as its body the properties
 * returned from the spread operator plus the generated id.
 * Argument: comment object returned by the form after a user has
 * submitted a new one.
 * Make use of the `getComments` function from the ReadableAPI.
 */
export function addCommentToServer(comment) {
	return function(dispatch) {
		// Generate a UUID for this comment.
		const id = generateUUID();
		const timestamp = Date.now();
		return addToComments({ ...comment, id: id, timestamp: timestamp })
			.then(() => (
				getSingleComment(id)
					.then((data) => (
						dispatch(insertComment(data))
					))
			))
	};
};

/*
 * Pass a single post object to the store.
 */
export function insertPost(data) {
	const postId = data.id;
	const post = data;
	return {
		type: INSERT_POST,
		postId,
		post
	};
};

/*
 * Pass a single post object to the store.
 */
export function insertComment(data) {
	console.log(data);
	const parentId = data.parentId;
	const commentId = data.id;
	const comment = data;
	return {
		type: INSERT_COMMENT,
		parentId,
		commentId,
		comment
	};
};

/*
 * Get a single post object as data and update its contents.
 */
export function updatePost(data) {
	const postId = data.id;
	const title = data.title;
	const category = data.category;
	const body = data.body;
	return {
		type: UPDATE_POST,
		postId,
		title,
		category,
		body
	};
};

/*
 * Get a single comment object as data and update its contents.
 */
export function updateComment(data) {
	const commentId = data.id;
	const timestamp = data.timestamp;
	const body = data.body;
	return {
		type: UPDATE_COMMENT,
		commentId,
		timestamp,
		body
	};
};

/*
 * Get a single post object as data and update its voteScore.
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
 * Get a single comment object as data and update its voteScore.
 */
export function updateCommentScore(data) {
	const commentId = data.id;
	const commentScore = data.voteScore;
	return {
		type: UPDATE_COMMENT_SCORE,
		commentId: commentId,
		commentScore: commentScore
	};
};

/*
 *	Change the `deleted` property in the deleted post.
 */
export function flagPostAsDeleted(postId) {
	return {
		type: FLAG_POST_AS_DELETED,
		postId
	};
};

/*
 * Get a data array of posts and return, as payload, an object with
 * an array of all the posts ids filtered to not include the deleted
 * posts.
 */
export function updatePostsVisibility(data) {
	return {
		type: UPDATE_POSTS_VISIBILITY,
		allPosts: data.filter((post) => (
			!post.deleted
		)).map((post) => (
			post.id
		))
	};
};

/*
 * Get a data array of comments and return, as payload, an object with
 * an array of all the comments ids filtered to not include the deleted
 * comments.
 */
export function updateCommentsVisibility(data, parentId) {
	console.log(parentId);
	return {
		type: UPDATE_COMMENTS_VISIBILITY,
		commentsIds: data.filter((comment) => (
			!comment.deleted
		)).map((comment) => (
			comment.id
		)),
		parentPostId: parentId
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

/*
 * Pass vote to the post with given postId. Vote can be either
 * positive or negative.
 */
export function addVoteToComment(commentId, vote) {
	return function(dispatch) {
		return voteComment(commentId, { option: vote})
			.then(() => (
				getSingleComment(commentId)
					.then((data) => (
						dispatch(updateCommentScore(data))
					))
			))
	};
};

/*
 * Edit the selected post.
 */
export function editSinglePost(postId, newPost) {
	return function(dispatch) {
		return editPost(postId, newPost)
			.then(() => (
				getSinglePost(postId)
					.then((data) => (
						dispatch(updatePost(data))
					))
			))
	};
};

/*
 * Edit the selected comment.
 */
export function editSingleComment(commentId, newComment) {
	return function(dispatch) {
		const timestamp = Date.now();
		return editComment(commentId, { ...newComment, timestamp: timestamp })
			.then(() => (
				getSingleComment(commentId)
					.then((data) => (
						dispatch(updateComment(data))
					))
			))
	};
};

/*
 * Change the `deleted` flag to true of the post referenced by `postId`.
 */
export function deleteSinglePost(postId) {
	return function (dispatch) {
		return deletePost(postId)
			.then(() => (
				dispatch(flagPostAsDeleted(postId))
			))
			.then(() => (
				getPosts()
					// As data are returned, dispatch an action to dispose of them.
					.then((data) => (
						dispatch(updatePostsVisibility(data))
					))
			));
	};
};

/*
 * Change the `deleted` flag to true of the comment referenced by `commentId`.
 */
export function deleteSingleComment(commentId, postId) {
	return function (dispatch) {
		return deleteComment(commentId)
			.then(() => (
				getComments(postId)
					// As data are returned, dispatch an action to dispose of them.
					.then((data) => (
						dispatch(updateCommentsVisibility(data, postId))
					))
			));
	};
};
