const accessTokenMatch = /access_token=(.*)&scope=&token_type=bearer/;

export const extractAccessToken = (gitHubTokenResponse: string) => {
	const result = gitHubTokenResponse.match(accessTokenMatch);
	if (result) {
		return result[1];
	} else {
		console.log('Cannot extract token !!!');
		return '';
	}
};
