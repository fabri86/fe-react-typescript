import { Reducer } from 'redux';
import { UserDetailsActionTypes, UserDetailsState } from './types';

const initialState: UserDetailsState = {
	userDetails: {
		name: '',
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
		case UserDetailsActionTypes.FETCH_USER_DETAILS_SUCCEDED:
			return {
				...state,
				fetchingDetails: false,
				userDetails: {
					name: action.payload.data.name,
					public_repos: action.payload.data.public_repos,
					login: action.payload.data.login,
					html_url: action.payload.data.html_url,
				},
				error: false,
			};
		case UserDetailsActionTypes.FETCH_USER_DETAILS_FAILED:
			return {
				...state,
				fetchingDetails: false,
				user: {},
				error: true,
			};
		default:
			return state;
	}
};

export default userDetailsReducer;
