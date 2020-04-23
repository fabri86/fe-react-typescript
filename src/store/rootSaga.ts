import { all, takeEvery } from 'redux-saga/effects';
import { UserActionTypes } from './ducks/users/types';
import { fetchGithubUsersSaga } from './ducks/users/sagas';

export default function* rootSaga() {
	return yield all([ takeEvery(UserActionTypes.FETCH_USERS_REQUEST, fetchGithubUsersSaga) ]);
}
