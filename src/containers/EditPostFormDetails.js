import { connect } from 'react-redux';
import { editSinglePost, fetchAllPosts } from '../actions';
import EditPostForm from '../components/EditPostForm';

const getPostFromPath = (ids, posts, path) => {
	/*
	 * As the current path for a Post View is made up of the category
	 * and the post id, take the string and get the id after the last `/`
	 * symbol.
	 */
	const postId = path.slice(path.lastIndexOf('/') + 1);

	if (ids.indexOf(postId) === -1) {
		console.log('NO');
		return {};
	}
	// Create a new post object.
  const post = {...posts[postId]};

  return post;
}

const mapStateToProps = (state, ownProps) => ({
	/*
	 * Pass `ownProps` as second argument to `mapStateToProps` to get
	 * access to the props passed to the container component.
	 */
	post: getPostFromPath(state.allPosts, state.posts, ownProps.path),
});

const mapDispatchToProps = {
	editPost: editSinglePost,
  getAllPosts: fetchAllPosts
};

export const EditPostFormDetails = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPostForm)