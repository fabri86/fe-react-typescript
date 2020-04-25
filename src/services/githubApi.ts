import axios from 'axios';

const LOCAL_SERVER = 'http://localhost:5000/';
const clientId = 'f5ec9ab370998eed5ae8'; // todo move out from this file
const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
const ACCESS_TOKEN_PARAM = 'accessToken';
const LOGIN_PARAM = 'login';
const SINCE_PARAM = 'since';

const GITHUB_OAUTH_API_URL = `${LOCAL_SERVER}oauth`;
const GITHUB_USERS_API_URL = `${LOCAL_SERVER}users`;
const GITHUB_USER_DETAILS_API_URL = `${LOCAL_SERVER}userDetails`;

const gitHubOAuthApi = (gitHubCode: string) => {
	return axios({
		url: GITHUB_OAUTH_API_URL,
		method: 'GET',
		params: {
			code: gitHubCode,
		},
	});
};

const gitHubAllUsersGet = (tokenValue: string, sinceValue: string) => {
	const searchParams = new URLSearchParams();
	searchParams.append(ACCESS_TOKEN_PARAM, tokenValue);

	if (sinceValue) {
		searchParams.append(SINCE_PARAM, sinceValue);
	}

	return axios({
		url: `${GITHUB_USERS_API_URL}?${searchParams.toString()}`, // todo consider POST and body
		method: 'GET',
	});
};

const gitHubUserDetailsGet = (tokenValue: string, login: string) => {
	const searchParams = new URLSearchParams({});
	searchParams.append(ACCESS_TOKEN_PARAM, tokenValue);
	searchParams.append(LOGIN_PARAM, login);

	return axios({
		url: `${GITHUB_USER_DETAILS_API_URL}?${searchParams.toString()}`, // todo consider POST and body
		method: 'GET',
	});
};

export default {
	gitHubOAuthApi,
	gitHubAllUsersGet,
	gitHubUserDetailsGet,
	githubLoginUrl,
};
