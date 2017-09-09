import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import AllPosts from '../components/AllPosts';
import Category from '../components/Category';
import Post from '../components/Post';
import { addPost, addComment, fetchAllPosts, setCategory, getPostDetails } from '../actions';
import { reset } from 'redux-form';
import '.././App.css';

class App extends Component {
  /*
   * As the component mounts, populate the posts state.
   */
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    /*
     * Extract properties from props.
     */

    // Extract posts passed to props via `mapStateToProps`.
    const posts = this.props.posts;
    // Extract methods passed to props via `MapDispatchToProps`.
    const getAllPosts = this.props.getAllPosts;
    const setPostValues = this.props.setPostValues;
    const setCommentValues = this.props.setCommentValues;

    const getPost = this.props.getPost;

    const urlParams = this.props.match.params;
    console.log(this.props);
    console.log(urlParams);
    const selectCategory = this.props.selectCategory;

    const postId = this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf('/') + 1);

    // const postDetails = posts.postDetails;

    const post = {...posts.posts[postId]};


    console.log(this.props);


    return (
      <div className="App">
        <div className="App-header">
          <h1>Readable App</h1>
        </div>
        {
          /*
           * <Switch> renders the first child <Route> that matches the
           * location.
           * <Switch> is unique in that it renders a route `exclusively`.
           * In contrast, every <Route> that matches the location renders
           * `inclusively`.
           */
        }
        <Switch>
          {
            /*
             * This Route Component takes a path and will render some UI
             * if that path matches the URL, but it won't render anything
             * if it doesn't match it.
             */
          }
          <Route
            exact path='/'
            render={() => (
              /*
               * Pass as props to `allPosts` some values. The passed values here
               * are the ones extracted from the App class props above.
               */
              <AllPosts
                posts = {posts}
                getAllPosts = {getAllPosts}
                setPostValues = {setPostValues}
                setCommentValues = {setCommentValues}
              />
            )}
          />
          {
            /*
             * This Route Component checks the URL, too, if there is not a
             * match from the previous one. If its path matches the URL, it
             * renders (a UI based on what it's called by its `render` method),
             * otherwise it does not render anything.
             */
          }
          <Route
            exact path='/:category?'
            render={() => (
              <Category
                posts = {posts}
                selectedCategory = {urlParams.category}
              />
            )}
          />
          <Route
            path='/:postId?'
            render={() => (
              // <p>{this.props.location.pathname.slice(this.props.location.pathname.lastIndexOf('/') + 1)}</p>
              <Post
                postId = {postId}
                post = {post}
                // getPost = {getPost}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

// Take the current store state and return it as posts via props.
function mapStateToProps(posts) {
  return {
    posts
  }
}

// Pass actions to be dispatch as props.
function mapDispatchToProps(dispatch) {
  return {
    setPostValues: (data) => dispatch(addPost(data)),
    setCommentValues: (data) => dispatch(addComment(data)),
    selectCategory: (category) => dispatch(setCategory(category)),
    getAllPosts: () => dispatch(fetchAllPosts()),
    getPost: (postId) => dispatch(getPostDetails(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
