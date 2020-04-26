import * as React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../store/ducks/users/types';
import * as styles from './GitHubUser.scss';

const GitHubUser = ({ avatar_url, login, onUserSelected }: User) => (
	<div className={styles.gitHubUser}>
		<img src={avatar_url} />
		<div>
			<p>{login}</p>
			<button onClick={onUserSelected}>
				<Link to={`users/${login}`}>SHOW DETAILS</Link>
			</button>
		</div>
	</div>
);

export default GitHubUser;
