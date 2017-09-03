import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, addComment, fetchAllPosts, addNewPost } from '../actions';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
import { reset } from 'redux-form';

import '.././App.css';

class App extends Component {
  componentDidMount() {
    console.log(this.props);

    // this.props.requestAllPosts();
    //   // dispatch(fetchAllPosts());
    // }
    this.props.getAllPosts();
    console.log(this.props);
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
      // {
        title: values.title,
        author: values.author,
        category: values.category,
        body: values.body,
        // id: 'aaccccc'
      // }
    });

    this.props.getAllPosts();
  }

  // Triggered by onSubmit in the comment form.
  submitComment = (values) => {
    console.log(values);
    console.log(this.props);
    /*
     * Call the `displayComment` property function passed
     * to props by `mapDispatchToProps`.
     * Get the values from the comment form and dispatch the
     * action `addComment` from the reducer passing the comment
     * object and the related post id as arguments.
     */
    this.props.displayComment({
      comment: {
        body: values.comment
      },
      postId: values.allPosts
    });
  }

  // Get all the submitted posts from any category.
  getThePosts = () => {
    console.log(this.props);
    console.log(this.props.posts.allPosts);

    const allPosts = this.props.posts.allPosts;
    return allPosts;
    // return ['1', '2', '3'];
  }


  render() {
    console.log(this.props);

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
    displayComment: (data) => dispatch(addComment(data)),
    getAllPosts: () => dispatch(fetchAllPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
