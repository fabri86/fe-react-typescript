import axios from 'axios';

const LOCAL_SERVER = 'http://localhost:5000/';
const clientId = 'f5ec9ab370998eed5ae8'; // todo move out from this file
const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

const GITHUB_OAUTH_API_URL = `${LOCAL_SERVER}oauth`;
const GITHUB_USERS_API_URL = `${LOCAL_SERVER}users`;

const gitHubOAuthApi = (gitHubCode: string) => {
	return axios({
		url: GITHUB_OAUTH_API_URL,
		method: 'GET',
		params: {
			code: gitHubCode,
		},
	});
};

const gitHubAllUsersGet = (accessToken: string, since: string = '') => {
	console.log('since parameter value is: ', since);
	const SINCE = since ? `&since=${since}` : ''; // todo build query params

	return axios({
		url: `${GITHUB_USERS_API_URL}?accessToken=${accessToken}${SINCE}`, // todo consider POST and body
		method: 'GET',
	});
};

export default {
	gitHubOAuthApi,
	gitHubAllUsersGet,
	githubLoginUrl,
};
