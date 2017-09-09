import React from 'react';
import { Link } from 'react-router-dom';
import AddTextIcon from 'react-icons/lib/fa/plus-circle';

const PostFormLink = () => {
	return (
		// Router Link for the Post create button.
		<Link to='/create'>
			<AddTextIcon size={40} />
		</Link>
	);
};

export default PostFormLink;