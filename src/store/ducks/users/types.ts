export enum UserActionTypes {
	FETCH_USERS_REQUEST = '@users/FETCH_USERS_REQUEST',
	FETCH_USERS_SUCCEDED = '@users/FETCH_USERS_SUCCEDED',
	FETCH_USERS_FAILED = '@users/FETCH_USERS_FAILED',
	USER_SELECTED = '@users/USER_SELECTED',
}

export interface User {
	id: number;
	login: string;
	avatar_url: string;
	onUserSelected: any;
}

export interface UserState {
	readonly users: User[];
	readonly fetching: boolean;
	readonly error: boolean;
	nextUsersSince: string;
	selectedUser: User;
}

export interface UsersResponse {
	users: User[];
	nextUsersSince: string;
}
