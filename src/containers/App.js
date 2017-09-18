import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { VisiblePosts, VisibleCategoryPosts } from './VisiblePosts';
import Category from '../components/Category';
import { PostDetails } from './PostDetails';
import { CreatePostFormDetails } from './CreatePostFormDetails';
import { EditPostFormDetails } from './EditPostFormDetails';
import { fetchAllPosts } from '../actions';
import '.././App.css';

class App extends Component {
  state = {
    shouldFetchPosts: true
  }
  /*
   * As the component mounts, populate the posts state.
   */
  componentDidMount() {
    if (this.state.shouldFetchPosts) {
      this.props.getAllPosts();
      this.setState({
        shouldFetchPosts: false
      });
    }
  }


  render() {
    console.log(this.props);

    /*
     * Get the `match` object from Route props (see '../index.js').
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
              <CreatePostFormDetails />
            )}
          />

          <Route
            exact path='/edit/:postId?'
            render={() => (
              <EditPostFormDetails
                path = {path}
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
};

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = {
  getAllPosts: fetchAllPosts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)