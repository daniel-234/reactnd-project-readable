const api = process.env.REACT_APP_PROJECT_READABLE_API_URL || 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/*
 * Get all the posts stored in the server.
 */
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(
      res => res.json(),
      error => console.log('An error occurred', error)
    )

/*
 * Get all the comments stored in the server that reference the
 * given parent id.
 */
export const getComments = (parentId) =>
  fetch(`${api}/posts/` + parentId + `/comments`, { headers })
    .then(
      res => res.json(),
      error => console.log('An error occurred', error)
    )

/*
 * Add a post to the server.
 */
export const addToPosts = (obj) =>
  fetch(`${api}/posts`, {
    method: `POST`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(res => res.json())

/*
 * Add a comment to the server.
 */
export const addToComments = (obj) =>
  fetch(`${api}/comments`, {
    method: `POST`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(res => res.json())

/*
 * Get the details of a single post.
 */
export const getSinglePost = (postId) =>
  fetch(`${api}/posts/` + postId, { headers })
    .then(
      res => res.json(),
      error => console.log('An error occurred', error)
    )

/*
 * Get the details of a single comment.
 */
export const getSingleComment = (postId) =>
  fetch(`${api}/comments/` + postId, { headers })
    .then(
      res => res.json(),
      error => console.log('An error occurred', error)
    )

/*
 * Pass the downVote or upVote to the post with given `postId`.
 */
export const votePost = (postId, vote) =>
  fetch(`${api}/posts/` + postId, {
    method: `POST`,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote)
  })
  .then(res => res.json())

/*
 * Pass the downVote or upVote to the comment with given `commentId`.
 */
export const voteComment = (commentId, vote) =>
  fetch(`${api}/comments/` + commentId, {
    method: `POST`,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote)
  })
  .then(res => res.json())

/*
 * Edit the post with id value `postId`.
 */
export const editPost = (postId, newPost) =>
  fetch(`${api}/posts/` + postId, {
    method: `PUT`,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost)
  })
  .then(res => res.json())


// app.put('/posts/:id', bodyParser.json(), (req, res) => {
//     posts.edit(req.token, req.params.id, req.body)
//       .then(
//         (data) => res.send(data),
//           (error) => {
//               console.error(error)
//               res.status(500).send({
//                   error: 'There was an error.'
//               })
//           }
//       )
// })

// app.post('/posts/:id', bodyParser.json(), (req, res) => {
//     const { option } = req.body
//     const id = req.params.id
//     posts.vote(req.token, id, option)
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

// function edit (token, id, post) {
//     return new Promise((res) => {
//         let posts = getData(token)
//         for (prop in post) {
//             posts[id][prop] = post[prop]
//         }
//         res(posts[id])
//     })
// }

/*
 * Delete the post with id value `postId`.
 */
export const deletePost = (postId) =>
  fetch(`${api}/posts/` + postId, {
    method: `DELETE`,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    }})

/*
 * Delete the comment with id value `commentId`.
 */
export const deleteComment = (commentId) =>
  fetch(`${api}/comments/` + commentId, {
    method: `DELETE`,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    }})

