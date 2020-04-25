import { action } from 'typesafe-actions';

import { UserActionTypes, UsersResponse } from './types';

export const fetchUsers = () => action(UserActionTypes.FETCH_USERS_REQUEST);

export const fetchUsersSucceded = (data: UsersResponse) => action(UserActionTypes.FETCH_USERS_SUCCEDED, { data });

export const fetchUsersFailed = () => action(UserActionTypes.FETCH_USERS_FAILED);

export const userSelected = (data: string) => action(UserActionTypes.USER_SELECTED, { data });
