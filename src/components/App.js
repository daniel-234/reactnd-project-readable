import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log('Props', this.props);
    return (
      <div className="App">
        Hello World
      </div>
    );
  }
}

function mapStateToProps(category) {
  return {
    category: category
  }
}

export default connect(mapStateToProps)(App);
