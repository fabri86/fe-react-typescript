import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import UsersList from './containers/UsersList/UsersList';
import { UserDetails } from './containers/UserDetails/UserDetails';
import SignInWithGithub from './components/SignInWithGithub/SignInWithGithub';
import SignInCb from './components/SignInWithGithub/SignInCb';

const Root = () => (
	<Provider store={store}>
		<Router>
			<Navigation />
			<Switch>
				<Route exact path='/' component={UsersList} />
				<Route path={[ '/users/:id' ]} component={UserDetails} />
				<Route path='/signingh' component={SignInWithGithub} />
				<Route path='/gh/:callback' component={SignInCb} />
				<Redirect to='/' />
			</Switch>
		</Router>
	</Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot !== undefined) {
	module.hot.accept();
}
