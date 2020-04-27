import { call, put, select, takeEvery, fork } from 'redux-saga/effects';
import { fetchUsersSucceded, fetchUsersFailed } from './actionCreators';
import { GitHubSignInTypes } from '../gitHubSignIn/types';
import githubApi from './../../../services/githubApi';
import { getAccessToken } from './../../ducks/gitHubSignIn/selectors';
import { getNextUsersSince } from './../../ducks/users/selectors';
import { UserActionTypes } from './types';
import { extractSinceFromHeaderLink } from '../../../utils/utils';

export function* onFetchGithubUsersSaga() {
	try {
		const accessToken = yield select(getAccessToken);
		const since = yield select(getNextUsersSince);
		const response = yield call(githubApi.gitHubAllUsersGet, accessToken, since);
		const nextUsersSince = extractSinceFromHeaderLink(response.data.nextLink);
		yield put(fetchUsersSucceded({ users: response.data.users, nextUsersSince: nextUsersSince }));
	} catch (err) {
		console.log('Users saga error', err);
		yield put(fetchUsersFailed());
	}
}

function* requestUsersSaga() {
	yield takeEvery(GitHubSignInTypes.GITHUB_ACCESS_TOKEN_SUCCESS, onFetchGithubUsersSaga);
}

function* requestMoreUsersSaga() {
	yield takeEvery(UserActionTypes.FETCH_USERS_REQUEST, onFetchGithubUsersSaga);
}

export default [ fork(requestUsersSaga), fork(requestMoreUsersSaga) ];
