import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import UsersList from './containers/UsersList/UsersList';
import UserDetails from './containers/UserDetails/UserDetails';
import GithHubSignIn from './containers/GithubSignIn/GitHubSignIn';
import SignInWithGithub from './components/GitHubLogin/GitHubLogin';
import { accessTokenSuccess } from './store/ducks/gitHubSignIn/actionCreators';
import { ACCESS_TOKEN } from './utils/utils';
import DefaultLayout from './layout/DefaultLayout';

class Root extends React.Component<any, {}> {
	componentDidMount() {
		this.callBackendAPI()
			.then((res) => {
				this.setState({ data: res.express });
			})
			.catch((err) => console.log(err));

		this.checkForTokenInLocalStorage();
	}

	checkForTokenInLocalStorage = () => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN);

		if (accessToken) {
			console.log('@@@ You are authenticated...');
			store.dispatch(accessTokenSuccess(accessToken));
		}
	};

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
		// const token = this.props.accessToken; // PUBLIC ROUTE AND PRIVATE ROUTE

		return (
			<DefaultLayout>
				<Provider store={store}>
					<Router>
						<Navigation />
						<Switch>
							<Route exact path='/' component={UsersList} />
							<Route path={'/users/:login'} component={UserDetails} />
							<Route path='/signingh' component={SignInWithGithub} />
							<Route path='/gh/:callback' component={GithHubSignIn} />
							<Redirect to='/' />
						</Switch>
					</Router>
				</Provider>
			</DefaultLayout>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot !== undefined) {
	module.hot.accept();
}
