import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, addComment } from '../actions';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
import { reset } from 'redux-form';

import '.././App.css';

class App extends Component {
  submitPost = (values) => {
    console.log(values);
    this.props.displayPost({
      post: {
        title: values.title,
        author: values.author,
        category: values.category,
        body: values.body,
        // comment: values.comment
      }
    });
  }

  submitComment = (values) => {
    console.log(values);
    console.log(this.props);
    this.props.displayComment({
      comment: {
        body: values.comment
      }
    });
  }

  getAllPosts = () => {
    // console.log(this.props.posts.post.allPosts);
    const allPosts = this.props.posts.post.allPosts;
    console.log(this.props.posts.post.entities.posts);
    console.log(this.props.posts);
    console.log(allPosts);

    return allPosts;
    // })
  }


  render() {
    // this.getAllPosts();

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
        <CommentForm onSubmit={this.submitComment} getPosts={this.getAllPosts} />
      </div>
    );
  }
}

// Takes the current store state and returns it as props.
// TODO
// Refactor argument and argument name
function mapStateToProps(posts) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    displayPost: (data) => dispatch(addPost(data)),
    displayComment: (data) => dispatch(addComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
