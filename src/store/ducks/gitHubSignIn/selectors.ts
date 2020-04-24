export const getLoginCode = (state: ApplicationStore) => state.gitHubSignInState.code;

export const getAccessToken = (state: ApplicationStore) => state.gitHubSignInState.accessToken;
