const accessTokenMatch = /access_token=(.*)&scope=&token_type=bearer/;
const headerLinkMatch = /<(?:.*)?(?:since=([0-9]*))(?:.*)/;

export const extractAccessToken = (gitHubTokenResponse: string) => {
	const result = gitHubTokenResponse.match(accessTokenMatch);
	if (result) {
		return result[1];
	} else {
		console.log('Cannot extract token !!!');
		return '';
	}
};

export const extractSinceFromHeaderLink = (headerLink: string) => {
	const result = headerLink.match(headerLinkMatch);
	if (result) {
		return result[1];
	} else {
		console.log('Cannot extract GitHub headerLink since info !!!');
		return '';
	}
};

export function setCookie(name: string, val: string) {
	// Could not find any good cookies librarysupporting TS out there... :(
	// Cookies will expire in 1 hour ...

	const date = new Date();
	date.setTime(date.getTime() + 60 * 60 * 1000);
	document.cookie = `${name}=${val}; expires=${date.toUTCString()}; path=/`;
}

export function getCookie(name: string) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length == 2) {
		const last = parts.pop();
		return last ? last.split(';').shift() : '';
	}

	return '';
}
