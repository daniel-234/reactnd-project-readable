import React, { Component } from 'react';

class Post extends Component {
	render() {
		// Get the current post.
		const post = this.props.post;

		return (
			<p>
				{post.title}
			</p>
		);
	}
}

export default Post;