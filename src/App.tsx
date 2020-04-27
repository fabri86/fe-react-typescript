import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import SignIn from './components/GitHubLogin/GitHubLogin';
import GitHubSignedIn from './containers/GithubSignIn/GitHubSignIn';
import UserDetails from './containers/UserDetails/UserDetails';
import UsersList from './containers/UsersList/UsersList';

interface StateProps {
	accessToken: string;
}

interface DispatchProps {}

type AppProps = StateProps & DispatchProps;

class App extends React.Component<AppProps, {}> {
	render() {
		if (!this.props.accessToken) {
			return (
				<Router>
					<Switch>
						<Route path='/signin' component={SignIn} />
						<Route path='/gh/:callback' component={GitHubSignedIn} />
						<Redirect to='/signin' />
					</Switch>
				</Router>
			);
		}

		return (
			<Router>
				<Switch>
					<Route exact path='/' component={UsersList} />
					<Route
						path='/users/:login'
						render={(routeProps) => <UserDetails routeProps={routeProps.location.pathname} />}
					/>
					<Redirect to='/' />
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = (state: ApplicationStore): StateProps => {
	const accessToken = state.gitHubSignInState.accessToken;

	return {
		accessToken: accessToken,
	};
};

const connector = connect(mapStateToProps);

export default connector(App);
