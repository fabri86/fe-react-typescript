import { call, put, select, takeEvery, fork } from 'redux-saga/effects';
import { fetchUsersSucceded, fetchUsersFailed } from './actionCreators';
import { GitHubSignInTypes } from '../gitHubSignIn/types';
import githubApi from './../../../services/githubApi';
import { getAccessToken } from './../../ducks/gitHubSignIn/selectors';
import { getNextUsersSince } from './../../ducks/users/selectors';
import { UserActionTypes } from './types';
import { extractSinceFromHeaderLink } from '../../../utils/utils';

export function* fetchGithubUsersSaga() {
	try {
		const accessToken = yield select(getAccessToken);
		const response = yield call(githubApi.gitHubAllUsersGet, accessToken);

		const nextUsersSince = extractSinceFromHeaderLink(response.data.nextLink);

		yield put(fetchUsersSucceded({ users: response.data.users, nextUsersSince: nextUsersSince }));
	} catch (err) {
		console.log('Users saga error', err);
		yield put(fetchUsersFailed());
	}
}

// todo sagas can be unified (and check if nextUserSince before invokin)

function* fetchMoreUsersSaga() {
	try {
		const accessToken = yield select(getAccessToken);
		const nextUsersSince = yield select(getNextUsersSince);
		const response = yield call(githubApi.gitHubAllUsersGet, accessToken, nextUsersSince);
		yield put(fetchUsersSucceded(response.data));
	} catch (err) {
		console.log('Culd not fetch more users');
		yield put(fetchUsersFailed());
	}
}

function* requestUsersSaga() {
	yield takeEvery(GitHubSignInTypes.GITHUB_ACCESS_TOKEN_SUCCESS, fetchGithubUsersSaga);
}

function* requestMoreUsersSaga() {
	yield takeEvery(UserActionTypes.FETCH_USERS_REQUEST, fetchMoreUsersSaga);
}

export default [ fork(requestUsersSaga), fork(requestMoreUsersSaga) ];
