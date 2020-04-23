import { action } from 'typesafe-actions';

import { UserActionTypes, User } from './types';

export const fetchUsers = () => action(UserActionTypes.FETCH_USERS_REQUEST);

export const fetchUsersSucceded = (data: User[]) => action(UserActionTypes.FETCH_USERS_SUCCEDED, { data });

export const fetchUsersFailed = () => action(UserActionTypes.FETCH_USERS_FAILED);
