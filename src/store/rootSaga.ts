import { all } from 'redux-saga/effects';
import gitHubSagas from './ducks/gitHubSignIn/sagas';
import usersSagas from './ducks/users/sagas';
import userDetailsSaga from './ducks/userDetails/sagas';

export default function* rootSaga() {
	return yield all([ ...gitHubSagas, ...usersSagas, ...userDetailsSaga ]);
}
