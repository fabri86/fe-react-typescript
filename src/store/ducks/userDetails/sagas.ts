import { call, put, takeEvery, fork, select, take } from 'redux-saga/effects';
import { UserDetailsActionTypes } from './types';
import githubApi from './../../../services/githubApi';
import { getAccessToken } from '../gitHubSignIn/selectors';
import { fetchUserDetailsSucceded, fetchUserDetailsFailed } from './actionCreators';
import { getSelectedUserLogin, getUserDetailsLogin } from './selectors';
import { UserActionTypes } from '../users/types';
import { mapToObjDtoFromResponse } from '../../../utils/utils';
import { isUserDetailsInterfaceProp } from './helper';

function* onFetchUserDetails(selectedUserLogin: string, accessToken: string) {
	if (selectedUserLogin) {
		const response = yield call(githubApi.gitHubUserDetailsGet, accessToken, selectedUserLogin);
		const userDetails = mapToObjDtoFromResponse(response.data, isUserDetailsInterfaceProp);
		yield put(fetchUserDetailsSucceded(userDetails));
	}
}

function* onFetchFromButtonClick() {
	try {
		yield take(UserDetailsActionTypes.FETCH_USER_DETAILS_REQUEST);
		const accessToken = yield select(getAccessToken);
		const selectedUserLogin = yield select(getSelectedUserLogin);
		yield* onFetchUserDetails(selectedUserLogin, accessToken);
	} catch (err) {
		console.log('User details could not be fetched', err);
		yield put(fetchUserDetailsFailed());
	}
}

function* onFetchDetailsFromRoute() {
	try {
		const accessToken = yield select(getAccessToken);
		const selectedUserLogin = yield select(getUserDetailsLogin);
		yield* onFetchUserDetails(selectedUserLogin, accessToken);
	} catch (err) {
		console.log('User details could not be fetched', err);
		yield put(fetchUserDetailsFailed());
	}
}

function* requesUserDetailsSaga() {
	yield takeEvery(UserActionTypes.USER_SELECTED, onFetchFromButtonClick);
}

function* requestUserDetailsFromRoute() {
	yield takeEvery(UserDetailsActionTypes.USER_DETAILS_SUCCESSFULLY_UPDATED_FROM_ROUTE, onFetchDetailsFromRoute);
}

export default [ fork(requesUserDetailsSaga), fork(requestUserDetailsFromRoute) ];
