import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions';
import PostForm from './PostForm';
import { reset } from 'redux-form';

import '.././App.css';

class App extends Component {
  submit = (values) => {
    console.log(values);
    this.props.displayPost({
      post: {
        title: values.title,
        author: values.author,
        category: values.category,
        body: values.body
      }


    });
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
        <PostForm onSubmit={this.submit} />
      </div>
    );
  }
}

// Takes the current store state and returns it as props.
// TODO
// Refactor argument and argument name
function mapStateToProps(categoryPosts) {
  return {
    categoryPosts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    displayPost: (data) => dispatch(addPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
