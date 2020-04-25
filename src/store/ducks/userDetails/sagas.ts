import { call, put, takeEvery, fork, select, take } from 'redux-saga/effects';
import { UserDetailsActionTypes } from './types';
import githubApi from './../../../services/githubApi';
import { getAccessToken } from '../gitHubSignIn/selectors';
import { fetchUserDetailsSucceded, fetchUserDetailsFailed } from './actionCreators';
import { getSelectedUserLogin } from './selectors';
import { UserActionTypes } from '../users/types';

function* onFetchGithubUserDetails() {
	try {
		yield take(UserDetailsActionTypes.FETCH_USER_DETAILS_REQUEST);
		const accessToken = yield select(getAccessToken);
		const selectedUserLogin = yield select(getSelectedUserLogin);

		if (selectedUserLogin) {
			const response = yield call(githubApi.gitHubUserDetailsGet, accessToken, selectedUserLogin);
			yield put(fetchUserDetailsSucceded(response.data));
		}
	} catch (err) {
		console.log('User details could not be fetched', err);
		yield put(fetchUserDetailsFailed());
	}
}

function* requesUserDetailsSaga() {
	yield takeEvery(UserActionTypes.USER_SELECTED, onFetchGithubUserDetails);
}

export default [ fork(requesUserDetailsSaga) ];
