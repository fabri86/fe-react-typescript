import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as UserDetailsActions from './../../store/ducks/userDetails/actionCreators';
import { UserDetailsInterface } from '../../store/ducks/userDetails/types';
import GitHubUserDetails from '../../components/GitHubUserDetails/GitHubUserDetails';
import { User } from '../../store/ducks/users/types';

interface StateProps {
	userDetails: UserDetailsInterface;
	usersInfo: User;
	fetchingDetails: boolean;
}

interface DispatchProps {
	fetchUserDetails: () => void;
}

type UserDetailsProps = StateProps & DispatchProps;

class UserDetails extends React.Component<UserDetailsProps> {
	componentDidMount() {
		this.props.fetchUserDetails();
	}

	render() {
		const { userDetails, usersInfo, fetchingDetails } = this.props;

		if (fetchingDetails) {
			return <div>Loading...</div>; //todo spinner
		}

		return (
			<div>
				<GitHubUserDetails user={usersInfo} userDetails={userDetails} />
			</div>
		);
	}
}

const mapStateToProps = (state: ApplicationStore): StateProps => {
	const userDetailsState = state.userDetailsState;
	const usersState = state.usersState;

	return {
		userDetails: userDetailsState.userDetails,
		fetchingDetails: userDetailsState.fetchingDetails,
		usersInfo: usersState.selectedUser,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserDetailsActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(UserDetails);
