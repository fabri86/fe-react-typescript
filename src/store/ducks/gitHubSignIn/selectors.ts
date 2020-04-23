import { GitHubSignInState } from './types';

export const getLoginCode = (state: GitHubSignInState) => state.code;
