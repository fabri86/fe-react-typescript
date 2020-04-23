import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import * as GithubSignInActions from './../../store/ducks/gitHubSignIn/actionCreators';

interface StateProps {
	code: '';
	accessToken: '';
}

interface DispatchProps {
	requestGitHubToken(code: string): void;
}

type GithHubSignInProps = RouteComponentProps & DispatchProps & StateProps;

class GithHubSignIn extends React.Component<GithHubSignInProps, {}> {
	async componentDidMount() {
		const { location, requestGitHubToken } = this.props;
		const codeGH = new URLSearchParams(location.search).get('code');

		if (codeGH) {
			requestGitHubToken(codeGH);

			// await axios({
			// 	baseURL: github.githubOAuthUrl,
			// 	method: 'GET',
			// 	params: {
			// 		code: codeGH,
			// 	},
			// })
			// 	.then((response) => {
			// 		console.log(response.data);
			// 		accessTokenSuccess(response.data);
			// 	})
			// 	.catch((err) => {
			// 		console.log('Could not receive a token', err);
			// 		accessTokenFailure();
			// 	});
		} else {
			console.error('Did not receive a code from Github');
		}
	}

	render() {
		const { accessToken } = this.props;

		if (!accessToken) {
			return null;
		}

		return <div>Token has been obtained!!</div>;
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(GithubSignInActions, dispatch);

const connector = connect(mapDispatchToProps);

export default connector(GithHubSignIn);
