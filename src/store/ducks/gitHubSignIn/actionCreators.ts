import { action } from 'typesafe-actions';
import { GitHubSignInTypes } from './types';

export const requestGitHubToken = () => action(GitHubSignInTypes.GITHUB_REQUEST_TOKEN);

export const loginForTokenSuccess = (data: string) =>
	action(GitHubSignInTypes.GITHUB_LOGIN_FOR_TOKEN_SUCCESS, { data });

export const accessTokenSuccess = (data: string) => action(GitHubSignInTypes.GITHUB_ACCESS_TOKEN_SUCCESS, { data });

export const accessTokenFailure = () => action(GitHubSignInTypes.GITHUB_ACCESS_TOKEN_FAILURE);
