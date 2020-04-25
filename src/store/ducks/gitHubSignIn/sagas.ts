import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import githubApi from './../../../services/githubApi';
import { accessTokenSuccess, accessTokenFailure } from './actionCreators';
import { getLoginCode } from './selectors';
import { GitHubSignInTypes } from './types';
import { extractAccessToken } from './../../../utils/utils';

function* onRequestGitHubTokenSaga() {
	try {
		const code = yield select(getLoginCode);
		if (code) {
			const response = yield call(githubApi.gitHubOAuthApi, code);
			const accessToken = yield extractAccessToken(response.data);
			yield put(accessTokenSuccess(accessToken));
		}
	} catch (err) {
		console.log('GitHub Saga Error', err);
		yield put(accessTokenFailure());
	}
}

export function* loginForGitHubTokenSaga() {
	console.log('REQUESTED TO START');
}

function* requestGitHubTokenRequestSaga() {
	yield takeLatest(GitHubSignInTypes.GITHUB_REQUEST_TOKEN, onRequestGitHubTokenSaga);
}

function* requestGitHubTokenSaga() {
	yield takeLatest(GitHubSignInTypes.GITHUB_LOGIN_FOR_TOKEN_SUCCESS, onRequestGitHubTokenSaga);
}

export default [ fork(requestGitHubTokenRequestSaga), fork(requestGitHubTokenSaga) ];
