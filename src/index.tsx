import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import UsersList from './containers/UsersList/UsersList';
import { UserDetails } from './containers/UserDetails/UserDetails';
import GithHubSignIn from './containers/GithubSignIn/GitHubSignIn';
import SignInWithGithub from './components/GitHubLogin/GitHubLogin';

class Root extends React.Component<any, {}> {
	componentDidMount() {
		this.callBackendAPI()
			.then((res) => {
				this.setState({ data: res.express });
			})
			.catch((err) => console.log(err));
	}

	// Fetches our GET route from our server
	callBackendAPI = async () => {
		const response = await fetch('src/server');
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Navigation />
					<Switch>
						<Route exact path='/' component={UsersList} />
						<Route path={'/users/:id'} component={UserDetails} />
						<Route path='/signingh' component={SignInWithGithub} />
						<Route path='/gh/:callback' component={GithHubSignIn} />
						<Redirect to='/' />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot !== undefined) {
	module.hot.accept();
}
