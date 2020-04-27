import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { User } from '../../store/ducks/users/types';
import * as UserActions from './../../store/ducks/users/actionCreators';
import InfiniteScroll from 'react-infinite-scroll-component';
import GitHubUser from './../../components/GitHubUser/GitHubUser';
import Loader from 'react-loader-spinner';
import * as styles from './UsersList.scss';

interface StateProps {
	users: User[];
}

interface DispatchProps {
	fetchUsers: () => void;
	userSelected: (selected: any) => void;
}

type UsersProps = StateProps & DispatchProps;

class UsersList extends React.Component<UsersProps> {
	handleUserSelected = (login: User) => {
		this.props.userSelected(login);
	};

	renderLoader = () => {
		return <Loader type='Oval' color='#00BFFF' height={100} width={100} timeout={3000} />;
	};

	render() {
		const { users, fetchUsers } = this.props;

		if (!users) {
			return this.renderLoader();
		}

		return (
			<div className={styles.usersList}>
				{users && <h1>GitHub users</h1>}
				<InfiniteScroll
					dataLength={this.props.users.length}
					next={fetchUsers}
					hasMore={true}
					loader={this.renderLoader()}
					endMessage={<h4>No more users</h4>}
					className={'usersInfiniteScroll'}
				>
					<div>
						{users.map((user) => {
							const { id, login, avatar_url } = user;
							return (
								<div key={`gitHubUser-id-${user.id}-${Math.random()}`}>
									<GitHubUser
										id={id}
										login={login}
										avatar_url={avatar_url}
										onUserSelected={() => this.handleUserSelected(user)}
									/>
								</div>
							);
						})}
					</div>
				</InfiniteScroll>
			</div>
		);
	}
}

const mapStateToProps = (state: ApplicationStore): StateProps => {
	const usersState = state.usersState;

	return {
		users: usersState.users,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(UsersList);
