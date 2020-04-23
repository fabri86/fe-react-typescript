import { Reducer } from 'redux';
import { UserActionTypes, UserState } from './types';

const initialState: UserState = {
	users: [],
	error: false,
	fetching: false,
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
				users: action.payload.data,
				error: false,
			};
		case UserActionTypes.FETCH_USERS_FAILED:
			return {
				...state,
				fetching: false,
				users: [],
				error: true,
			};
		default:
			return state;
	}
};

export default usersRedeucer;
