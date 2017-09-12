import { connect } from 'react-redux';
import { changeSortingOrder, addVoteToPost } from '../actions'
import AllPosts from '../components/AllPosts';

const getVisiblePosts = (postIds, posts, sortOrder) => {
	console.log(postIds);
	console.log(posts);
	console.log(sortOrder);
	const ids = postIds.slice();
	let sortedIds;

	// = ["8xf0y6ziyjabvozdd253nd", "6ni6ok3ym7mf1p33lnez", "5338d2ba-e683-4294-8870-3503ffa2818b", "5b5b81a5-df47-443a-8ad4-4544e88ba939"];

	switch (sortOrder) {
		case 'MOST_RECENT':
			sortedIds = ids.sort(function(a, b) { return posts[b].timestamp - posts[a].timestamp });
			console.log(sortedIds);
			return sortedIds;
			// return ["8xf0y6ziyjabvozdd253nd", "6ni6ok3ym7mf1p33lnez", "5338d2ba-e683-4294-8870-3503ffa2818b", "5b5b81a5-df47-443a-8ad4-4544e88ba939"];
		case 'LEAST_RECENT':
			sortedIds = ids.sort(function(a, b) { return posts[a].timestamp - posts[b].timestamp });
			console.log(sortedIds);
			return sortedIds;
			// return ["5338d2ba-e683-4294-8870-3503ffa2818b", "5b5b81a5-df47-443a-8ad4-4544e88ba939", "8xf0y6ziyjabvozdd253nd", "6ni6ok3ym7mf1p33lnez"];
		case 'HIGHEST_POINTS':
			sortedIds = ids.sort(function(a, b) { return posts[b].voteScore - posts[a].voteScore });
			console.log(sortedIds);
			return sortedIds;
		case 'LOWEST_POINTS':
			sortedIds = ids.sort(function(a, b) { return posts[a].voteScore - posts[b].voteScore });
			console.log(sortedIds);
			return sortedIds;
			// return ["6ni6ok3ym7mf1p33lnez", "5338d2ba-e683-4294-8870-3503ffa2818b", "8xf0y6ziyjabvozdd253nd", "5b5b81a5-df47-443a-8ad4-4544e88ba939"];
			// return postIds.sort(function(a, b) { return posts[a].voteScore - posts[b].voteScore });
		default:
			return sortedIds;
	};
	// console.log(postIds);
	// return postIds;
};

const mapStateToProps = (state) => ({
	sortedIds: getVisiblePosts(state.allPosts, state.posts, state.sortOrder),
	posts: state.posts
});

const mapDispatchToProps = {
	sortPosts: changeSortingOrder,
	votePosts: addVoteToPost
}

const VisiblePosts = connect(
	mapStateToProps,
	mapDispatchToProps
)(AllPosts)

export default VisiblePosts;