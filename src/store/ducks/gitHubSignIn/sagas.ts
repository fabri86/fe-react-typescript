import { call, put, select, takeLatest, take } from 'redux-saga/effects';
import github from './../../../services/githubApi';
import { GitHubSignInTypes } from './types';

import { accessTokenSuccess, accessTokenFailure } from './actionCreators';
import { getLoginCode } from './selectors';

function* requestGitHubTokenSaga() {
	try {
		yield take(GitHubSignInTypes.GITHUB_REQUEST_TOKEN);
		const code = yield select(getLoginCode);
		const response = yield call(() => github.gitHubOAuthApi(code));
		yield put(accessTokenSuccess(response));
	} catch (err) {
		console.log(err);
		yield put(accessTokenFailure());
	}
}

export function* loginForGitHubTokenSaga() {
	yield takeLatest(GitHubSignInTypes.GITHUB_LOGIN_FOR_TOKEN_SUCCESS, requestGitHubTokenSaga);
}
