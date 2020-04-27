import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import * as GithubSignInActions from './../../store/ducks/gitHubSignIn/actionCreators';
import { getAccessToken } from '../../store/ducks/gitHubSignIn/selectors';
import { CODE_QUERY_PARAM } from './../../utils/utils';

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
	componentDidMount() {
		const { location, loginForTokenSuccess, requestGitHubToken } = this.props;
		const codeGH = new URLSearchParams(location.search).get(CODE_QUERY_PARAM);
		requestGitHubToken();

		if (codeGH) {
			loginForTokenSuccess(codeGH);
		} else {
			console.error('Did not receive a code from Github');
		}
	}

	render() {
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
