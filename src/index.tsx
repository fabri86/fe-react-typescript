import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import User from './components/User/User';

const Root = () => (
	<Provider store={store}>
		<Router>
			<Navigation />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path={[ '/users/:id' ]} component={User} />
				<Redirect to='/' />
			</Switch>
		</Router>
	</Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot !== undefined) {
	module.hot.accept();
}
