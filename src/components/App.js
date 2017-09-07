import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AllPosts from './AllPosts';
import Category from './Category';
import { addPost, addComment, fetchAllPosts } from '../actions';
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

    return (
      <div className="App">
        <div className="App-header">
          <h1>Readable App</h1>
        </div>
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
          path='/react'
          render={() => (
            <Category
              posts = {posts}
            />
          )}
        />
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
    getAllPosts: () => dispatch(fetchAllPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
