import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fetchUsersSucceded, fetchUsersFailed } from './actionCreators';
import { GitHubSignInTypes } from '../gitHubSignIn/types';
import githubApi from './../../../services/githubApi';
import { getAccessToken } from './../../ducks/gitHubSignIn/selectors';

export function* fetchGithubUsersSaga() {
	try {
		const accessToken = yield select(getAccessToken);
		const response = yield call(githubApi.gitHubAllUsersGet, accessToken);
		console.log('@@@@@@@@@USERS FETCH ', response.data);

		yield put(fetchUsersSucceded(response));
	} catch (err) {
		console.log(err);
		yield put(fetchUsersFailed());
	}
}

export const usersSagas = [ takeLatest(GitHubSignInTypes.GITHUB_ACCESS_TOKEN_SUCCESS, fetchGithubUsersSaga) ];
