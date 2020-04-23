import axios from 'axios';

const clientId = 'f5ec9ab370998eed5ae8'; //todo move out from this file
const githubApiUrl = 'https://api.github.com/';

const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
const githubOAuthUrl = 'http://localhost:5000/oauth';

const githubApi = axios.create({
	baseURL: githubApiUrl,
	headers: { Accept: 'application/vnd.github.v3+json' },
});

const gitHubOAuthApi = (gitHubCode: string) =>
	axios({
		url: githubOAuthUrl,
		method: 'GET',
		params: {
			code: gitHubCode,
		},
	});

export default {
	gitHubOAuthApi,
	githubLoginUrl,
	githubOAuthUrl,
	githubApi,
};
