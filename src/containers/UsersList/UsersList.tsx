import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { User } from '../../store/ducks/users/types';
import * as UserActions from './../../store/ducks/users/actionCreators';
import InfiniteScroll from 'react-infinite-scroll-component';
import './UsersList.scss';
import GitHubUser from './../../components/GitHubUser/GitHubUser';

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

	render() {
		const { users, fetchUsers } = this.props;

		if (!users) {
			return <div>Show spinner and then users...</div>;
		}

		return (
			<div>
				<InfiniteScroll
					dataLength={this.props.users.length}
					next={fetchUsers}
					hasMore={true}
					loader={<h4>Loading more users</h4>}
					endMessage={<h4>No more users</h4>}
				>
					<div>
						{users.map((user) => {
							const { id, login, avatar_url } = user;
							return (
								<div key={user.id}>
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
