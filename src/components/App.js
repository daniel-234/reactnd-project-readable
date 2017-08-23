import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions';

class App extends Component {
  submitPost = () => {
    this.props.displayPost({
      category: 'react',
      post: {
        body: this.input.value
      }
    });

    this.input.value = ''
  }

  render() {
    console.log(this.props);

    return (
      <div className="App">

      <div className="App-header">
          <h2>Readable App</h2>
        </div>
        <input
          type='text'
          ref={(input) => this.input = input}
          placeholder="Write a post about React"
        />
        <button onClick={this.submitPost}>Submit</button>
      </div>
    );
  }
}

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
