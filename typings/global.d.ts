import { Store as ReduxStore } from 'redux';
import { UserState } from '../src/store/ducks/users/types';
import { GitHubSignInState } from '../src/store/ducks/gitHubSignIn/types';

declare global {
	interface ApplicationStore {
		usersState: UserState;
		gitHubSignInState: GitHubSignInState;
	}

	interface Window {
		store?: ReduxStore<ApplicationStore>;
	}
}
