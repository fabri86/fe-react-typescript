import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
	<nav>
		<ul>
			<li>
				<NavLink to='/home'>Home</NavLink>
			</li>
			<li>
				<NavLink to='/users/1'>User details</NavLink>
			</li>
		</ul>
	</nav>
);
