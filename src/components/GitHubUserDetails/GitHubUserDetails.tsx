import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserDetailsInterface } from '../../store/ducks/userDetails/types';
import { User } from '../../store/ducks/users/types';

interface GitHubUserDetailsProps {
	user: User;
	userDetails: UserDetailsInterface;
}

const GitHubUserDetails = ({ user, userDetails }: GitHubUserDetailsProps) => (
	<div>
		<button>
			<Link to={'/'}>Go back</Link>
		</button>
		<div className='githubUserDetails'>
			<img src={user.avatar_url} />
			<p>Github name: {user.login}</p>
			<a href={userDetails.html_url}>Repo link: {userDetails.html_url}</a>
			<p>Name: {user.login}</p>
			<p>Public repos: {userDetails.public_repos}</p>
		</div>
	</div>
);

export default GitHubUserDetails;
