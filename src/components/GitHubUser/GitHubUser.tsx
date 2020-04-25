import * as React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../store/ducks/users/types';
import './GitHubUser.scss';

const GitHubUser = ({ avatar_url, login, onUserSelected }: User) => (
	<div className='githubUser'>
		<p>{login}</p>
		<button onClick={onUserSelected}>
			<Link to={`users/${login}`}>SHOW DETAILS</Link>
		</button>

		<img className='githubUser__avatar' src={avatar_url} />
	</div>
);

export default GitHubUser;
