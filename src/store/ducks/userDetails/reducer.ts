import { Reducer } from 'redux';
import { UserDetailsActionTypes, UserDetailsState } from './types';

const initialState: UserDetailsState = {
	userDetails: {
		name: '',
		avatar_url: '',
		login: '',
		public_repos: 0,
		html_url: '',
	},
	error: false,
	fetchingDetails: false,
};

const userDetailsReducer: Reducer<UserDetailsState> = (state = initialState, action) => {
	switch (action.type) {
		case UserDetailsActionTypes.FETCH_USER_DETAILS_REQUEST:
			return {
				...state,
				fetchingDetails: true,
			};
		case UserDetailsActionTypes.USER_DETAILS_UPDATE_FROM_ROUTE:
			return {
				...state,
				userDetails: {
					...state.userDetails,
					login: action.payload.data,
				},
			};
		case UserDetailsActionTypes.FETCH_USER_DETAILS_SUCCEDED:
			return {
				...state,
				fetchingDetails: false,
				userDetails: action.payload.data,
				error: false,
			};
		case UserDetailsActionTypes.FETCH_USER_DETAILS_FAILED:
			return {
				...state,
				fetchingDetails: false,
				error: true,
			};
		default:
			return state;
	}
};

export default userDetailsReducer;
