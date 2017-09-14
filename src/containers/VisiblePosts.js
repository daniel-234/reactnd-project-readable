import { connect } from 'react-redux';
import { changeSortingOrder, addVoteToPost, sortingTypes, deleteSinglePost } from '../actions'
import AllPosts from '../components/AllPosts';
import Category from '../components/Category';

// Extract the properties from the `sortingTypes` object.
const {
	MOST_RECENT,
	LEAST_RECENT,
	HIGHEST_POINTS,
	LOWEST_POINTS
} = sortingTypes;

/*
 * Define a function that gets an array of post ids and returns a new
 * array (copied from it), that gets sorted according to `state.sortOrder`.
 *
 */
const getVisiblePosts = (postIds, posts, sortOrder) => {
	/*
	 * Return a new array copied from the `postIds` array.
	 * Copy the `postIds` array and return a new one.
	 *
	 * NOTE Actually, not doing it will prevent the `AllPosts`  presentational
	 * component from re-rendering the View as the order of the array
	 * elements changes.
	 * Performing the `sort` method on `postIds` directly, in fact, will mutate
	 * a state argument directly, preventing Redux from knowing that something has
	 * changed.
	 * With redux, you never mutate any part of the state.
	 */
	const ids = postIds.slice();
	// Declare a variable to store the sorted array.
	let sortedIds;

	// Sort the `ids` array depending on the state sorting order chosen.
	switch (sortOrder) {
		case MOST_RECENT:
			sortedIds = ids.sort(function(a, b) { return posts[b].timestamp - posts[a].timestamp });
			return sortedIds;
		case LEAST_RECENT:
			sortedIds = ids.sort(function(a, b) { return posts[a].timestamp - posts[b].timestamp });
			return sortedIds;
		case HIGHEST_POINTS:
			sortedIds = ids.sort(function(a, b) { return posts[b].voteScore - posts[a].voteScore });
			return sortedIds;
		case LOWEST_POINTS:
			sortedIds = ids.sort(function(a, b) { return posts[a].voteScore - posts[b].voteScore });
			return sortedIds;
		default:
			return ids;
	};
};

// Define props to pass to the presentational component.
const mapStateToProps = (state) => ({
	sortedIds: getVisiblePosts(state.allPosts, state.posts, state.sortOrder),
	posts: state.posts
});

/*
 * Receive the `dispatch` method and return callback props to inject
 * into the presentational component.
 */
const mapDispatchToProps = {
	sortPosts: changeSortingOrder,
	votePosts: addVoteToPost,
	deletePost: deleteSinglePost
}

/*
 * Hook up the `AllPosts` and the `Category` presentational components
 * to Redux by connecting it to this container component.
 */
export const VisiblePosts = connect(
	mapStateToProps,
	mapDispatchToProps
)(AllPosts);

export const VisibleCategoryPosts = connect(
	mapStateToProps,
	mapDispatchToProps
)(Category);