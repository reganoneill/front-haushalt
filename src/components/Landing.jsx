import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
	<div className="landing">
		<h1>test</h1>
		<input type="text" placeholder="test test" />
		<Link to="/search">or Browse All</Link>
	</div>
);

export default Landing;
