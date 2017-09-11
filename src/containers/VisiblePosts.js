import { connect } from 'react-redux';
import AllPosts from '../components/AllPosts';

const getVisiblePosts = (postIds, posts, sortOrder) => {
	console.log(postIds);
	console.log(posts);
	console.log(sortOrder);

	switch (sortOrder) {
		case 'MOST_RECENT':
			return postIds.sort(function(a, b) { return posts[a].timestamp - posts[b].timestamp });
		case 'LEAST_RECENT':
			return postIds.sort(function(a, b) { return posts[b].timestamp - posts[a].timestamp });
		case 'HIGHEST_POINTS':
			return postIds.sort(function(a, b) { return posts[b].voteScore - posts[a].voteScore });
		case 'LOWEST_POINTS':
			return postIds.sort(function(a, b) { return posts[a].voteScore - posts[b].voteScore });
		default:
			return postIds;
	}
	// console.log(postIds);
	// return postIds;
}

const mapStateToProps = (state) => ({
	postIds: getVisiblePosts(state.allPosts, state.posts, state.sortOrder),
	posts: state.posts
})

const VisiblePosts = connect(
	mapStateToProps
)(AllPosts)

export default VisiblePosts;