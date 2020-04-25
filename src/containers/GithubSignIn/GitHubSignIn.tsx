import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import * as GithubSignInActions from './../../store/ducks/gitHubSignIn/actionCreators';
import { getAccessToken } from '../../store/ducks/gitHubSignIn/selectors';

interface StateProps {
	code: string;
	accessToken: string;
}

interface DispatchProps {
	requestGitHubToken(): void;
	loginForTokenSuccess(codeGH: string): void;
}

type GithHubSignInProps = RouteComponentProps & DispatchProps & StateProps;

class GithHubSignIn extends React.Component<GithHubSignInProps, {}> {
	async componentDidMount() {
		const { location, loginForTokenSuccess, requestGitHubToken } = this.props;
		const codeGH = new URLSearchParams(location.search).get('code');
		requestGitHubToken();

		if (codeGH) {
			loginForTokenSuccess(codeGH);
		} else {
			console.error('Did not receive a code from Github');
		}
	}

	render() {
		const { accessToken } = this.props;

		if (accessToken) {
			return <Redirect to='/' />;
		}
		return null;
	}
}

const mapStateToProps = (state: ApplicationStore) => {
	const accessToken = getAccessToken(state);

	return {
		accessToken: accessToken,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(GithubSignInActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GithHubSignIn);
