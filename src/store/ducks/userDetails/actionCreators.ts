import { action } from 'typesafe-actions';
import { UserDetailsActionTypes, UserDetailsResponse } from './types';

export const fetchUserDetails = () => action(UserDetailsActionTypes.FETCH_USER_DETAILS_REQUEST);

export const fetchUserDetailsSucceded = (data: UserDetailsResponse) =>
	action(UserDetailsActionTypes.FETCH_USER_DETAILS_SUCCEDED, { data });

export const fetchUserDetailsFailed = () => action(UserDetailsActionTypes.FETCH_USER_DETAILS_FAILED);

export const userDetailsUpdateFromRoute = (data: string) =>
	action(UserDetailsActionTypes.USER_DETAILS_UPDATE_FROM_ROUTE, { data: data });

export const userDetailsSuccessfullyUpdatedFromRoute = () =>
	action(UserDetailsActionTypes.USER_DETAILS_SUCCESSFULLY_UPDATED_FROM_ROUTE);
