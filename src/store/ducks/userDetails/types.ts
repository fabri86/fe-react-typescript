export enum UserDetailsActionTypes {
	FETCH_USER_DETAILS_REQUEST = '@userDetails/FETCH_USER_DETAILS_REQUEST',
	FETCH_USER_DETAILS_SUCCEDED = '@userDetails/FETCH_USER_DETAILS_SUCCEDED',
	FETCH_USER_DETAILS_FAILED = '@userDetails/FETCH_USER_DETAILS_FAILED',
	USER_DETAILS_UPDATE_FROM_ROUTE = '@userDetails/USER_DETAILS_UPDATE_FROM_ROUTE',
	USER_DETAILS_SUCCESSFULLY_UPDATED_FROM_ROUTE = '@userDetails/USER_DETAILS_SUCCESSFULLY_UPDATED_FROM_ROUTE',
}

export interface UserDetailsInterface {
	login: string;
	avatar_url: string;
	name: string;
	public_repos: number;
	html_url: string;
}

export interface UserDetailsState {
	readonly userDetails: UserDetailsInterface;
	readonly fetchingDetails: boolean;
	readonly error: boolean;
}

export interface UserDetailsResponse {
	userDetails: UserDetailsInterface;
}
