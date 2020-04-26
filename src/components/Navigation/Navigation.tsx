import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
	<nav>
		<ul>
			<li>
				<NavLink to='/signingh'>Sign in with Github</NavLink>
			</li>
		</ul>
	</nav>
);
