import React, { Component } from 'react';
import { connect } from 'react-redux';
// TODO delete old actions
import { addPost, addComment, fetchAllPosts, fetchAllComments, addNewPost, addNewComment } from '../actions';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
import { reset } from 'redux-form';

import '.././App.css';

class App extends Component {
  /*
   * As the component mounts, call the two functions to populate
   * the `entities` state.
   */
  componentDidMount() {
    this.props.getAllPosts();
    this.props.getAllComments();
  }

  // Triggered by onSubmit in the post form.
  submitPost = (values) => {
    console.log(values);
    /*
     * Call the `displayPost` property function passed
     * to props by `mapDispatchToProps`.
     * Get the values from the post form and dispatch the
     * action `addPost` from the reducer passing the post
     * object as argument.
     */
    this.props.displayPost({
        title: values.title,
        author: values.author,
        category: values.category,
        body: values.body,
    });

    /*
     * After the new post is submitted, get the state synchronized
     * with the server.
     */
    this.props.getAllPosts();
    this.props.getAllComments();
  }

  // Triggered by onSubmit in the comment form.
  submitComment = (values) => {
    /*
     * Call the `displayComment` property function passed
     * to props by `mapDispatchToProps`.
     * Get the values from the comment form and dispatch the
     * action `addComment` from the reducer passing the comment
     * object and the related post id as arguments.
     */
    this.props.displayComment({
        body: values.comment,
        // For now just add comments to the same post.
        // TODO change it.
        parentId: '8xf0y6ziyjabvozdd253nd'
    });
    // Get the comments from the server.
    this.props.getAllComments();
  }

  // Get all the submitted posts from any category.
  getThePosts = () => {
    const allPosts = this.props.posts.allPosts;
    return allPosts;
  }

  render() {
    // console.log(this.props);

    return (
      <div className="App">
        <div className="App-header">
          <h1>Readable App</h1>
        </div>
        <h2>Add a post</h2>
        {
          /*
           * `onSubmit` prop passed from the App Container to the
           * PostForm Component.
           * The Component will look for it in its prop to know
           * what `handleSubmit` will do with the values passed
           * by the user in the form.
           */
        }
        <PostForm onSubmit={this.submitPost} />
        <h2>Add a comment</h2>
        <CommentForm onSubmit={this.submitComment} getPosts={this.getThePosts} />
      </div>
    );
  }
}

// Takes the current store state and returns it as props.
function mapStateToProps(posts) {
  return {
    posts
  }
}

// Dispatch actions to the store.
function mapDispatchToProps(dispatch) {
  return {
    displayPost: (data) => dispatch(addNewPost(data)),
    displayComment: (data) => dispatch(addNewComment(data)),
    getAllPosts: () => dispatch(fetchAllPosts()),
    getAllComments: () => dispatch(fetchAllComments())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
