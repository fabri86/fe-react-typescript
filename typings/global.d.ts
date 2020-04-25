import { UserDetailsState } from './../src/store/ducks/userDetails/types';
import { Store as ReduxStore } from 'redux';
import { UserState } from '../src/store/ducks/users/types';
import { GitHubSignInState } from '../src/store/ducks/gitHubSignIn/types';

declare global {
	interface ApplicationStore {
		usersState: UserState;
		gitHubSignInState: GitHubSignInState;
		userDetailsState: UserDetailsState;
	}

	interface Window {
		store?: ReduxStore<ApplicationStore>;
	}
}
