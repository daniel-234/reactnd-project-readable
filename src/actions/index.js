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


// TODO delete - unused
export function requestAllPosts() {
	return {
		type: REQUEST_ALL_POSTS
	};
};



export function receiveAllPosts(data) {
	return {
		type: RECEIVE_ALL_POSTS,
		allPosts: data.map(post => post)
	}
}

export function fetchAllPosts() {
	return function(dispatch) {
		// dispatch(requestAllPosts());

		return fetch(`${api}/posts`, { headers })
	    .then(
	    	res => res.json(),
	    	error => console.log('An error occurred', error))
	    .then(data => dispatch(receiveAllPosts(data)))
	}
}

export function addNewPost(post) {
	return function(dispatch) {
		// dispatch(addPost({ post }));
		const id = generateUUID();
		return fetch(`${api}/posts`, {
			method: `POST`,
			headers: {
				...headers,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...post, id: id })
		}).then(res => res.json())
	}
}



// app.post('/posts', bodyParser.json(), (req, res) => {
//     posts.add(req.token, req.body)
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

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query, maxResults) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query, maxResults })
//   }).then(res => res.json())
//     .then(data => data.books)

// export const remove = (contact) =>
//   fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
//     .then(res => res.json())
//     .then(data => data.contact)

// export const create = (body) =>
//   fetch(`${api}/contacts`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }).then(res => res.json())

// export const getAll = () =>
//   fetch(`${api}/contacts`, { headers })
//     .then(res => res.json())
//     .then(data => data.contacts)







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