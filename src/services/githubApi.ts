import axios from 'axios';
import { ACCESS_TOKEN } from '../utils/utils';

const LOCAL_SERVER = 'http://localhost:5000/';
const ACCESS_TOKEN_PARAM = 'accessToken';
const LOGIN_PARAM = 'login';
const SINCE_PARAM = 'since';
const CODE_PARAM = 'code';

const LOCAL_SERVER_PING = `${LOCAL_SERVER}ping`;
const GITHUB_OAUTH_API_URL = `${LOCAL_SERVER}oauth`;
const GITHUB_USERS_API_URL = `${LOCAL_SERVER}users`;
const GITHUB_USER_DETAILS_API_URL = `${LOCAL_SERVER}userDetails`;

interface QueryStringParam {
	name: string;
	value: string;
}

const pingLocalServer = () => gitHubGet(LOCAL_SERVER_PING, []);

const gitHubOAuthApi = (gitHubCode: string) =>
	gitHubGet(GITHUB_OAUTH_API_URL, [ { name: CODE_PARAM, value: gitHubCode } ]);

const gitHubAllUsersGet = (tokenValue: string, sinceValue: string) =>
	gitHubGet(GITHUB_USERS_API_URL, [
		{ name: ACCESS_TOKEN_PARAM, value: tokenValue },
		{ name: SINCE_PARAM, value: sinceValue },
	]);

const gitHubUserDetailsGet = (tokenValue: string, login: string) =>
	gitHubGet(GITHUB_USER_DETAILS_API_URL, [
		{ name: ACCESS_TOKEN, value: tokenValue },
		{ name: LOGIN_PARAM, value: login },
	]);

const gitHubGet = (url: string, params: QueryStringParam[]) => {
	const urlParams = new URLSearchParams();
	params.filter((p) => p.value !== undefined).forEach((p) => urlParams.append(p.name, p.value));

	return axios({
		url: `${url}`,
		method: 'GET',
		params: urlParams,
	});
};

export default {
	gitHubOAuthApi,
	gitHubAllUsersGet,
	gitHubUserDetailsGet,
	pingLocalServer,
};
