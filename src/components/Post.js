import React, { Component } from 'react';

class Post extends Component {
	// getPostDetails = () => (
	// 	this.props.getPost(this.props.postId)
	// );

	// componentDidMount() {
	// 	const postId = this.props.postId;
	// 	this.props.getPost(postId);
	// }
	// const post = (postId) => (
	// 		this.props.getPost(postId)
	// 	);

	render() {

		console.log(this.props);

		// console.log(this.props.post.postDetails.id);

		// const post1 = this.props.post;

		// const post = this.getPostDetails();

		const postId = this.props.postId;
		// const post = this.props.getPost(postId);
		// console.log(post);

		const post = this.props.post;
		console.log(post.id);


		// console.log(this.props);
		// const postDetails = this.props.post.postDetails;
		// console.log(this.props.postDetails);
		// console.log({ post1 });
		// const post2 = { post1 };
		// console.log(post2.post1.author);


		// Get all the submitted posts from any category.


		return (
			<p>{post.title}</p>
		);
	}
}

// const Post = (({ postUrl }) => (
// 	<p>{postUrl.pathname.slice(postUrl.pathname.lastIndexOf('/') + 1)}</p>
// ));

export default Post;