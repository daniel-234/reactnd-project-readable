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

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const SET_CATEGORY = 'SET_CATEGORY';
export const REQUEST_ALL_POSTS = 'REQUEST_ALL_POSTS';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';

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

export function requestAllPosts() {
	return {
		type: REQUEST_ALL_POSTS
	};
};

export function receiveAllPosts(data) {
	return {
		type: RECEIVE_ALL_POSTS,
		allPosts: data.map(post => post.title)
	}
}

export function fetchAllPosts() {
	return function(dispatch) {
		dispatch(requestAllPosts());

		return fetch(`${api}/posts`, { headers })
	    .then(
	    	res => res.json(),
	    	error => console.log('An error occurred', error))
	    .then(data => dispatch(receiveAllPosts(data)))
	}
}



// app.get('/posts', (req, res) => {
//     posts.getAll(req.token)
//       .then(
//           (data) => res.send(data),
//           (error) => {
//               console.error(error)
//               res.status(500).send({
//                  error: 'There was an error.'
//           })
//         }
//       )
// })

// app.get('/categories', (req, res) => {
//     categories.getAll(req.token)
//       .then(
//           (data) => res.send(data),
//           (error) => {
//               console.error(error)
//               res.status(500).send({
//                   error: 'There was an error.'
//               })
//           }
//       )
// })



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