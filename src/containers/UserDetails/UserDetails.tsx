import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as UserDetailsActions from './../../store/ducks/userDetails/actionCreators';
import { UserDetailsInterface } from '../../store/ducks/userDetails/types';
import GitHubUserDetails from '../../components/GitHubUserDetails/GitHubUserDetails';
import { User } from '../../store/ducks/users/types';
import Loader from 'react-loader-spinner';
import * as styles from './UserDetails.scss';
import { getUserFromPathname } from '../../utils/utils';
import { Link } from 'react-router-dom';

interface StateProps {
	userDetails: UserDetailsInterface;
	usersInfo: User;
	fetchingDetails: boolean;
	error: boolean;
}

interface DispatchProps {
	fetchUserDetails: () => void;
	userDetailsUpdateFromRoute: (data: string) => void;
	userDetailsSuccessfullyUpdatedFromRoute: () => void;
}

interface FromRouteProps {
	routeProps: any;
}

type UserDetailsProps = StateProps & DispatchProps & FromRouteProps;

class UserDetails extends React.Component<UserDetailsProps> {
	componentDidMount() {
		this.props.fetchUserDetails();
	}

	handleCallFromRoute() {
		const {
			userDetails: { login },
			userDetailsUpdateFromRoute,
			userDetailsSuccessfullyUpdatedFromRoute,
			routeProps,
		} = this.props;

		const loginFromRoute = getUserFromPathname(routeProps);

		if (loginFromRoute !== login) {
			userDetailsUpdateFromRoute(loginFromRoute);
			userDetailsSuccessfullyUpdatedFromRoute();
		}
	}

	renderLoader = () => (
		<div className={styles.usersDetails}>
			<h1>User details page</h1>
			<Loader type='Oval' color='#00BFFF' height={100} width={100} timeout={3000} />
		</div>
	);

	renderErrorMessage = () => (
		<div className={styles.usersDetails}>
			<h1>User details page</h1>
			<p>User does not exist or his details could not be found</p>
			<button>
				<Link to={'/'}>Go back</Link>
			</button>
		</div>
	);

	render() {
		const { userDetails, usersInfo, fetchingDetails, routeProps, error } = this.props;

		if (!userDetails.login && routeProps) {
			this.handleCallFromRoute();
		}

		if (fetchingDetails) {
			return this.renderLoader();
		}

		if (error) {
			return this.renderErrorMessage();
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
		error: userDetailsState.error,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserDetailsActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(UserDetails);
