import React from 'react';
import { Link } from 'react-router-dom';
import EditButton from 'react-icons/lib/fa/edit';

const EditPostButtonLink = (props) => {
	// const postId = this.props.post.id;
	return (
		// Router Link for the Post edit button.
		<Link to='/edit'>
			<EditButton
				className='post-details-edit-button'
				size='40'
				// value={postId}
	      onClick={() => {console.log(props.post.title)}} />
		</Link>
	);
};

export default EditPostButtonLink;