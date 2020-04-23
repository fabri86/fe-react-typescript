import { combineReducers } from 'redux';
import usersReducer from './ducks/users/reducer';
import gitHubSignInReducer from './ducks/gitHubSignIn/reducer';

export default combineReducers<ApplicationStore>({
	usersState: usersReducer,
	gitHubSignInState: gitHubSignInReducer,
});
