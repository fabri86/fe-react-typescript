import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserDetailsInterface } from '../../store/ducks/userDetails/types';
import { User } from '../../store/ducks/users/types';
import * as styles from './GitHubUserDetails.scss';

interface GitHubUserDetailsProps {
	user: User;
	userDetails: UserDetailsInterface;
}

const GitHubUserDetails = ({ user, userDetails }: GitHubUserDetailsProps) => (
	<div className={styles.userDetails}>
		<div>
			<h2>{user.login}</h2>
			<img src={user.avatar_url} />
			<h3>{userDetails.name}</h3>
			<a href={userDetails.html_url}>{userDetails.html_url}</a>
			<p>{userDetails.public_repos} public repositories</p>
		</div>
		<button>
			<Link to={'/'}>Go back</Link>
		</button>
	</div>
);

export default GitHubUserDetails;
