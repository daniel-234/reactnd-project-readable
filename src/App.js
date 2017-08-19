import React, { Component } from 'react';
import * as ReadableAPI from './utils/ReadableAPI'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    ReadableAPI.getAll().then((categories) => {
      this.setState({ categories });

      console.log(categories);
      console.log(this.state.categories);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
