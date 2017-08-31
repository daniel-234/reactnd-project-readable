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
      },
      postId: values.allPosts
    });
    // this.props.addToPost({
    //   console.log(values);
    // })
  }

  getAllPosts = () => {
    console.log(this.props);
    console.log(this.props.posts.allPosts);

    const allPosts = this.props.posts.allPosts;

    // console.log(this.props.posts.post.entities.posts);
    // console.log(this.props.posts);
    // console.log(allPosts);

    return allPosts;
    // })

    // return ['a', 'b', 'c'];
  }


  render() {
    // this.getAllPosts();
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
        <CommentForm onSubmit={this.submitComment} getPosts={this.getAllPosts} />
      </div>
    );
  }
}

// Takes the current store state and returns it as props.
function mapStateToProps(posts) {
  return {
    posts,
    refactored: posts.allPosts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    displayPost: (data) => dispatch(addPost(data)),
    displayComment: (data) => dispatch(addComment(data)),
    // addToPost: (data) => dispatch(addCommentToPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
