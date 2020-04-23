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
}

export interface UserState {
	readonly users: User[];
	readonly fetching: boolean;
	readonly error: boolean;
}
