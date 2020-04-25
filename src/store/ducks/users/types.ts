export enum UserActionTypes {
	FETCH_USERS_REQUEST = '@users/FETCH_USERS_REQUEST',
	FETCH_USERS_SUCCEDED = '@users/FETCH_USERS_SUCCEDED',
	FETCH_USERS_FAILED = '@users/FETCH_USERS_FAILED',
}

export interface User {
	id: number;
	githubName: string;
	avatar: string;
	link: string;
	login: string;
	// todo add requested fields
}

export interface UserState {
	readonly users: User[];
	readonly fetching: boolean;
	readonly error: boolean;
	nextUsersSince: string;
}

export interface UsersResponse {
	users: User[];
	nextUsersSince: string;
}
