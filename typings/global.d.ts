import { Store as ReduxStore } from 'redux';
import { UserState } from '../src/store/ducks/users/types';

declare global {
	interface ApplicationStore {
		usersState: UserState;
	}

	interface Window {
		store?: ReduxStore<ApplicationStore>;
	}
}
