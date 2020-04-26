import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as UserDetailsActions from './../../store/ducks/userDetails/actionCreators';
import { UserDetailsInterface } from '../../store/ducks/userDetails/types';
import GitHubUserDetails from '../../components/GitHubUserDetails/GitHubUserDetails';
import { User } from '../../store/ducks/users/types';
import Loader from 'react-loader-spinner';
import * as styles from './UserDetails.scss';

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

	renderLoader = () => {
		return <Loader type='Oval' color='#00BFFF' height={100} width={100} timeout={3000} />;
	};

	render() {
		const { userDetails, usersInfo, fetchingDetails } = this.props;

		if (fetchingDetails) {
			return (
				<div className={styles.usersDetails}>
					<h1>User details page</h1>
					{this.renderLoader()}
				</div>
			);
		}

		return (
			<div className={styles.usersDetails}>
				<h1>User details page</h1>
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
