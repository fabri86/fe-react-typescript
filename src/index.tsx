import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { accessTokenSuccess } from './store/ducks/gitHubSignIn/actionCreators';
import { getTokenFromLocalStorage } from './utils/utils';
import DefaultLayout from './layout/DefaultLayout';
import App from './App';

class Root extends React.Component {
	componentDidMount() {
		this.checkForTokenInLocalStorage();
	}

	checkForTokenInLocalStorage = () => {
		const accessToken = getTokenFromLocalStorage();

		if (accessToken) {
			store.dispatch(accessTokenSuccess(accessToken));
			console.log('@@@ You are authenticated...');
		}
	};

	callBackendAPI = async () => {
		const response = await fetch('src/server');

		if (response.status !== 200) {
			throw Error('Backend is down.');
		}
	};

	render() {
		return (
			<DefaultLayout>
				<Provider store={store}>
					<App />
				</Provider>
			</DefaultLayout>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot !== undefined) {
	module.hot.accept();
}
