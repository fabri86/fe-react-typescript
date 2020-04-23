import { combineReducers } from 'redux';
import usersReducer from './ducks/users/reducer';

export default combineReducers<ApplicationStore>({
	usersState: usersReducer,
});
