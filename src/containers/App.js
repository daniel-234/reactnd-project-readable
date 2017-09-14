import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
// import AllPosts from '../components/AllPosts';
import { VisiblePosts, VisibleCategoryPosts } from './VisiblePosts';
import Category from '../components/Category';
// import Post from '../components/Post';
import { PostDetails } from './PostDetails';
import CreatePostForm from '../components/CreatePostForm';
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
    const voteAPost = this.props.voteAPost;

    /*
     * Get the `match` object from Route props.
     * A `match` object contains information about how a <Route path>
     * matched the URL. `match` objects contain a `params` object property
     * with key/value pairs parsed from the URL corresponding to the dynamic
     * segment of the path.
     */
    const urlParams = this.props.match.params;
    // Get the category value from the params properties.
    const category = urlParams.category;

    /*
     * A `location` object is a <Switch> prop used for matching children
     * elements instead of the current history location.
     * All children of a <Switch> should be <Route> elements.
     * <Route> elements are matched using their pathname prop.
     */
    const path = this.props.location.pathname;

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
            exact path = '/'
            render = {() => (
              /*
               * Pass as props to `allPosts` some values. The passed values here
               * are the ones extracted from the App class props above.
               */
              <VisiblePosts />
            )}
          />

          {
            /*
             * This Route Component checks the URL, too, if there is not a
             * match from the previous one. If its path matches the URL, it
             * renders (a UI based on what it's called by its `render` method),
             * otherwise it does not render anything.
             * Checks if the Link to `create` a post has been called.
             */
          }
          <Route
            exact path='/create'
            render={() => (
              <CreatePostForm
                posts = {posts}
                getAllPosts = {getAllPosts}
                setPostValues = {setPostValues}
                setCommentValues = {setCommentValues}
              />
            )}
          />

          {
            /*
             * Checks if a category has been selected.
             */
          }
          <Route
            exact path = '/:category?'
            render = {() => (
              <VisibleCategoryPosts
                /*
                 * Pass the category taken form the `match` Route
                 * props to the VisibleCategoryComponent.
                 * This will match the category part of the URL and
                 * it will pass it to the component to render the
                 * relative posts.
                 */
                selectedCategory = {category}
              />
            )}
          />

          {
            /*
             * Checks if the URL matches a post id.
             */
          }
          <Route
            path='/:postId?'
            render={() => (
              <PostDetails
                path = {path}
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
    // voteAPost: (postId, vote) => dispatch(addVoteToPost(postId, vote)),
    // sortPosts: (newOrder) => dispatch(reorderPosts(newOrder))
    // getPost: (postId) => dispatch(getPostDetails(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
