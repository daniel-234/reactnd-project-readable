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

app.get('/posts', (req, res) => {
    posts.getAll(req.token)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                 error: 'There was an error.'
          })
        }
      )
})

  app.get('/posts/:id', (req, res) => {
    posts.get(req.token, req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

  `GET /posts/:id`
  **USAGE:**
    Get the details of a single post
    */
