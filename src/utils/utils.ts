const accessTokenMatch = /access_token=(.*)&scope=&token_type=bearer/;
const headerLinkMatch = /<(?:.*)?(?:since=([0-9]*))(?:.*)/;
const pathnameUserMatch = /users\/(.*)/;

const CLIENT_ID = 'f5ec9ab370998eed5ae8';
export const CODE_QUERY_PARAM = 'code';
export const ACCESS_TOKEN = 'accessToken';
export const LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;

export const extractAccessToken = (gitHubTokenResponse: string) => {
	const result = gitHubTokenResponse.match(accessTokenMatch);
	
	if (result) {
		return result[1];
	} else {
		console.error('Cannot extract token !!!');
		return '';
	}
};

export const extractSinceFromHeaderLink = (headerLink: string) => {
	const result = headerLink.match(headerLinkMatch);

	if (result) {
		return result[1];
	} else {
		console.error('Cannot extract GitHub headerLink since info !!!');
		return '';
	}
};

export const getTokenFromLocalStorage = () => localStorage.getItem(ACCESS_TOKEN)?.toString() ?? '';

export const getUserFromPathname = (pathname: string) => {
	const result = pathname.match(pathnameUserMatch);
	return result ? result[1] : '';
};

export const mapToObjDtoFromResponse = (response: any, predicate: (property: string) => boolean) => {	
  const objectDto = Object.keys(response)
  .filter(k => predicate(k))
  .reduce((obj: any, key: string) => {
    obj[key] = response[key];
    return obj;
  }, {});

  return objectDto;
};
