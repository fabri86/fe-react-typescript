import * as React from 'react';
import DefaultLayout from './../../layout/DefaultLayout';
import { LOGIN_URL } from './../../utils/utils';

export default () => {
	return (
		<DefaultLayout>
			<h1>Welcome to the GitHub api v3 application</h1>
			<p>To continue, please authenticate by clicking on the button below</p>
			<button>
				<a href={LOGIN_URL}>Sign in</a>
			</button>
		</DefaultLayout>
	);
};
