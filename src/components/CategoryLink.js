import React from 'react';
import { Link } from 'react-router-dom';

const CategoryLink = ({ category, children }) => (
	<Link
		to={category}
	>{children}
	</Link>
)

export default CategoryLink;