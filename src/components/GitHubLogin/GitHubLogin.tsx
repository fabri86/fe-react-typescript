import * as React from 'react';
import github from '../../services/githubApi';

export default () => {
	return (
		<div>
			<a href={github.githubLoginUrl}>Sign in with Github</a>
		</div>
	);
};
