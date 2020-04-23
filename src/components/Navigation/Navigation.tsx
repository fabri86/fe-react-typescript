import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
	<nav>
		<ul>
			<li>
				<NavLink to='/signincb'>CALLBACK</NavLink>
			</li>
			<br />
			<li>
				<NavLink to='/home'>Home</NavLink>
			</li>
			<br />
			<li>
				<NavLink to='/users/1'>User details</NavLink>
			</li>
			<br />
			<li>
				<NavLink to='/signingh'>Sign in with Github</NavLink>
			</li>
			<br />
		</ul>
	</nav>
);
