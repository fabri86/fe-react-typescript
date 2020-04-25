const accessTokenMatch = /access_token=(.*)&scope=&token_type=bearer/;
const headerLinkMatch = /<(?:.*)?(since=[0-9]*)(?:.*)/;

export const extractAccessToken = (gitHubTokenResponse: string) => {
	const result = gitHubTokenResponse.match(accessTokenMatch);
	if (result) {
		// console.log('Successfully extracted token');
		return result[1];
	} else {
		console.log('Cannot extract token !!!');
		return '';
	}
};

export const extractSinceFromHeaderLink = (headerLink: string) => {
	const result = headerLink.match(headerLinkMatch);
	if (result) {
		// console.log('Successfully extracted GitHub headerLink since info');
		return result[1];
	} else {
		console.log('Cannot extract GitHub headerLink since info !!!');
		return '';
	}
};