import { all } from 'redux-saga/effects';
import { gitHubSagas } from './ducks/gitHubSignIn/sagas';
import { usersSagas } from './ducks/users/sagas';

export default function* rootSaga() {
	return yield all([ ...gitHubSagas, ...usersSagas ]);
}
