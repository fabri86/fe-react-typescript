import { UserDetailsInterface } from './../../ducks/userDetails/types';

const sampleDetailsObj: UserDetailsInterface = {
	name: '',
	html_url: '',
	login: '',
	avatar_url: '',
	public_repos: 0,
};

export const isUserDetailsInterfaceProp = (prop: string) => {
	return Object.keys(sampleDetailsObj).some((key) => key === prop);
};
