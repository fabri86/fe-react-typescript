import { User } from './../users/types';

export enum userDetailsActionTypes {
	FETCH_USER_DETAILS_REQUEST = '@userDetails/FETCH_USER_DETAILS_REQUEST',
	FETCH_USER_DETAILS_SUCCEDED = '@userDetails/FETCH_USER_DETAILS_SUCCEDED',
	FETCH_USER_DETAILS_FAILED = '@userDetails/FETCH_USER_DETAILS_FAILED',
}

export interface UserDetails {
	userDto: User;
	githubProfileLink: string;
	publicReposCount: number;
}

export interface UserDetailsState {
	readonly userDetails: UserDetails;
	readonly fetchingUserDetails: boolean;
	readonly error: boolean;
}
