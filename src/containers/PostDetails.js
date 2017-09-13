import { connect } from 'react-redux';
import React from 'react';
import { addVoteToPost } from '../actions';
import Post from '../components/Post';

const getPostFromPath = (posts, path) => {
	/*
	 * As the current path for a Post View is made up of the category
	 * and the post id, take the string and get the id after the last `/`
	 * symbol.
	 */
	const postId = path.slice(path.lastIndexOf('/') + 1);
	// Create a new post object.
  const post = {...posts[postId]};

  return post;
}

const mapStateToProps = (state, ownProps) => ({
	/*
	 * Pass `ownProps` as second argument to `mapStateToProps` to get
	 * access to the props passed to the container component.
	 */
	post: getPostFromPath(state.posts, ownProps.path)
});

const mapDispatchToProps = {
	votePosts: addVoteToPost
};

export const PostDetails = connect(
	mapStateToProps,
	mapDispatchToProps
)(Post)