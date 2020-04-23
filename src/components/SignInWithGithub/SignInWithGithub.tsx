import * as React from 'react';

// todo move out
const clientId = 'f5ec9ab370998eed5ae8';
const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

export default () => {
	return (
		<div>
			<a href={oauthUrl}>Sign in with Github</a>
		</div>
	);
};
