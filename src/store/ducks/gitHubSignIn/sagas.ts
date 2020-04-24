import { call, put, select, takeLatest } from 'redux-saga/effects';
import githubApi from './../../../services/githubApi';
import { accessTokenSuccess, accessTokenFailure } from './actionCreators';
import { getLoginCode } from './selectors';
import { GitHubSignInTypes } from './types';

function* requestGitHubTokenSaga() {
	try {
		const code = yield select(getLoginCode);
		const response = yield call(githubApi.gitHubOAuthApi, code);
		console.log('@@ACCESS TOKEN IS: ', response.data);
		yield put(accessTokenSuccess(response.data));
	} catch (err) {
		console.log(err);
		yield put(accessTokenFailure());
	}
}

export function* loginForGitHubTokenSaga() {
	console.log('REQUESTED TO START');
}

export const gitHubSagas = [
	takeLatest(GitHubSignInTypes.GITHUB_REQUEST_TOKEN, requestGitHubTokenSaga),
	takeLatest(GitHubSignInTypes.GITHUB_LOGIN_FOR_TOKEN_SUCCESS, requestGitHubTokenSaga),
];
