import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions';
import '.././App.css';

class App extends Component {
  submitPost = () => {

    this.props.displayPost({
      category: 'react',
      post: {
        title: this.form.title,
        author: this.form.author,
        body: this.form.body
      }
    });

    this.form.reset();
    return false;
  }

  render() {
    console.log(this.props);

    return (
      <div className="App">
        <div className="App-header">
          <h1>Readable App</h1>
        </div>
          <h2>Add a post</h2>
          <form
            ref={(form) => this.form = form}>
            <section>
              <div>
                <label htmlFor="title">Title:</label>
                <input type='text' id='title' name='post-title' />
              </div>
              <div>
                <label htmlFor='author'>Author:</label>
                <input type='text' id='author' name='post-author' />
              </div>
              <div>
                <label htmlFor='body'>Body:</label>
                <textarea id='body' name='post-body'></textarea>
              </div>
            </section>
            <div className='button'>
              <button type='button' onClick={this.submitPost}>Submit</button>
            </div>
          </form>
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
