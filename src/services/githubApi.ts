import axios from 'axios';

const githubApiUrl = 'https://api.github.com/';
export const githubAuthUrl = 'https://github.com/login/oauth/access_token'; // todo remove export (wip - cannot generate OAuth)

const clientId = 'f5ec9ab370998eed5ae8';
const clientSecret = 'd25b18f047ee50d2b171e43463e129b65dd69a79';

const githubApi = axios.create({
	baseURL: githubApiUrl,
	headers: { Accept: 'application/vnd.github.v3+json' },
});

export const createAuthAPi = (githubCode: string) =>
	axios.create({
		baseURL: githubAuthUrl,
		method: 'POST',
		headers: {
			Accept: 'application/vnd.github.v3+json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With',
			'Access-Control-Allow-Methods': 'POST',
			'Access-Control-Allow-Credentials': true,
		},
		params: {
			client_id: clientId,
			clientSecret: clientSecret,
			code: githubCode,
			redirect_uri: '/',
		},
	});

export default githubApi;
