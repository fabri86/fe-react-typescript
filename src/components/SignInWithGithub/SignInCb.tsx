import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { githubAuthUrl } from '../../services/githubApi';

type SignInCbState = {
	state: {};
};

class SignInCb extends React.Component<RouteComponentProps, SignInCbState> {
	constructor(props: any) {
		super(props);
	}

	async componentDidMount() {
		const { search } = this.props.location;
		const codeGH = new URLSearchParams(search).get('code');

		if (codeGH) {
			// const post = createAuthAPi(codeGH);
			// const response = await post.post(githubAuthUrl); Axios should just work..

			const paramsForNormalFetch = {
				client_id: 'f5ec9ab370998eed5ae8',
				clientSecret: 'd25b18f047ee50d2b171e43463e129b65dd69a79',
				code: codeGH,
				redirect_uri: '/',
			};

			const response = await fetch(githubAuthUrl, {
				method: 'POST',
				mode: 'cors',
				headers: {
					Accept: 'application/vnd.github.v3+json',
				},
				body: JSON.stringify(paramsForNormalFetch),
			});

			const data = await response.json();
			console.log(data);
		} else {
			console.error('Did not receive a code from Github');
		}
	}

	render() {
		return <div>Requesting an access token. ...</div>;
	}
}

export default SignInCb;
