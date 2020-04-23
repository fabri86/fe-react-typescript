import { call, put } from 'redux-saga/effects';
import githubApi from './../../../services/githubApi';
import { fetchUsersSucceded, fetchUsersFailed } from './actionCreators';

export function* fetchGithubUsersSaga() {
	try {
		// console.log('@@@@@SAGA STARTED');
		const response = yield call(githubApi.get, 'users/');
		// console.log('@@@@@@@@@SAGA response', response);

		yield put(fetchUsersSucceded(response));
	} catch (err) {
		console.log(err);
		yield put(fetchUsersFailed());
	}
}
