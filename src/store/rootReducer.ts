import { combineReducers } from 'redux';
import usersReducer from './ducks/users/reducer';
import gitHubSignInReducer from './ducks/gitHubSignIn/reducer';
import userDetailsReducer from './ducks/userDetails/reducer';

export default combineReducers<ApplicationStore>({
	usersState: usersReducer,
	gitHubSignInState: gitHubSignInReducer,
	userDetailsState: userDetailsReducer,
});
