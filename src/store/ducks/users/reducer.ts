import { Reducer } from 'redux';
import { UserActionTypes, UserState } from './types';

const initialState: UserState = {
	users: [],
	error: false,
	fetching: false,
	nextUsersSince: '',
	selectedUser: {
		id: -1,
		login: '',
		avatar_url: '',
		onUserSelected: () => {},
	},
};

const usersRedeucer: Reducer<UserState> = (state = initialState, action) => {
	switch (action.type) {
		case UserActionTypes.FETCH_USERS_REQUEST:
			return {
				...state,
				fetching: true,
			};
		case UserActionTypes.FETCH_USERS_SUCCEDED:
			return {
				...state,
				fetching: false,
				users: [ ...state.users, ...action.payload.data.users ],
				nextUsersSince: action.payload.data.nextUsersSince,
				error: false,
			};
		case UserActionTypes.FETCH_USERS_FAILED:
			return {
				...state,
				fetching: false,
				users: [],
				error: true,
			};
		case UserActionTypes.USER_SELECTED:
			return {
				...state,
				selectedUser: action.payload.data,
			};
		default:
			return state;
	}
};

export default usersRedeucer;
