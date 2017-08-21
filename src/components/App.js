import React, { Component } from 'react';
import { addPost } from '../actions';

class App extends Component {
  // Create a local component state, assigning a `category`
  // property to it and giving it an initial value of null.
  state = {
    category: null
  }

  // When the `componentDidMount` lifecycle method runs,
  // take the store content from props.
  // Then subscribe to any changes that happen inside
  // the Redux store.
  componentDidMount() {
    const { store } = this.props;

    // Get the state out of the store and put it into the local
    // component state, which will cause a re-render.
    store.subscribe(() => {
      this.setState(() => ({
        // Whenever the store changes, assign its new current state to `this.state.category`.
        category: store.getState()
      }))
      if (this.state.category) {
        console.log(this.state.category.react[this.state.category.react.length - 1].body);
      }

    })
  }

  // Whenever this function runs, call `store.dispatch()` that will
  // invoke the `addPost` action creator, that takes as argument an
  // object with two properties on it, category and post.
  submitPost = () => {
    this.props.store.dispatch(addPost({
      category: 'react',
      post: {
        body: this.input.value
      }
    }))

    // Set back the input value to the empty string.
    this.input.value = ''
  }

  render() {
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

        <pre>
          Post body: {this.state.category && this.state.category.react[this.state.category.react.length - 1].body}
        </pre>
      </div>
    );
  }
}

export default App;
