import { all } from 'redux-saga/effects';
import { gitHubSagas } from './ducks/gitHubSignIn/sagas';

export default function* rootSaga() {
	return yield all([
		...gitHubSagas,
		// ...userSagas
	]);
}
