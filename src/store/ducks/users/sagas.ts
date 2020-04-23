import { call, put, take } from 'redux-saga/effects';
import github from './../../../services/githubApi';
import { fetchUsersSucceded, fetchUsersFailed } from './actionCreators';
import { GitHubSignInTypes } from '../gitHubSignIn/types';

export function* fetchGithubUsersSaga() {
	try {
		yield take(GitHubSignInTypes.GITHUB_ACCESS_TOKEN_SUCCESS);
		const response = yield call(github.githubApi, 'users/');
		yield put(fetchUsersSucceded(response));
	} catch (err) {
		console.log(err);
		yield put(fetchUsersFailed());
	}
}
