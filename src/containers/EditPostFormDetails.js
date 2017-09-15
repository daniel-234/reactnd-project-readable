import React from 'react';
import { connect } from 'react-redux';
import { addPost, addComment, fetchAllPosts } from '../actions';
import EditPostForm from '../components/EditPostForm';

const mapStateToProps = (state) => ({
	posts: state.posts,
	allPosts: state.allPosts
});

const mapDispatchToProps = {
	setPostValues: addPost,
  setCommentValues: addComment,
  getAllPosts: fetchAllPosts
};

export const EditPostFormDetails = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPostForm)