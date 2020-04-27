import { Reducer } from 'redux';
import { GitHubSignInTypes, GitHubSignInState } from './types';
import { getTokenFromLocalStorage } from '../../../utils/utils';

const initialState: GitHubSignInState = {
	accessToken: getTokenFromLocalStorage() ?? '',
	code: '',
};

const gitHubSignInReducer: Reducer<GitHubSignInState> = (state = initialState, action) => {
	switch (action.type) {
		case GitHubSignInTypes.GITHUB_REQUEST_TOKEN:
			return {
				...state, //todo add spinner while obtaining token?
			};
		case GitHubSignInTypes.GITHUB_LOGIN_FOR_TOKEN_SUCCESS:
			return {
				...state,
				code: action.payload.data,
			};
		case GitHubSignInTypes.GITHUB_ACCESS_TOKEN_SUCCESS:
			return {
				...state,
				accessToken: action.payload.data,
			};
		case GitHubSignInTypes.GITHUB_ACCESS_TOKEN_FAILURE:
			return {
				...state,
				accessToken: '',
			};
		default:
			return state;
	}
};

export default gitHubSignInReducer;
