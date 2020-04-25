import { action } from 'typesafe-actions';
import { UserDetailsActionTypes, UserDetailsResponse } from './types';

export const fetchUserDetails = () => action(UserDetailsActionTypes.FETCH_USER_DETAILS_REQUEST);

export const fetchUserDetailsSucceded = (data: UserDetailsResponse) =>
	action(UserDetailsActionTypes.FETCH_USER_DETAILS_SUCCEDED, { data });

export const fetchUserDetailsFailed = () => action(UserDetailsActionTypes.FETCH_USER_DETAILS_FAILED);
