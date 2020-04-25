import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { User } from '../../store/ducks/users/types';
import * as UserActions from './../../store/ducks/users/actionCreators';
import InfiniteScroll from 'react-infinite-scroll-component';
import './UsersList.scss';

interface StateProps {
	users: User[];
}

interface DispatchProps {
	fetchUsers: () => void;
}

type UsersProps = StateProps & DispatchProps;

class UsersList extends React.Component<UsersProps> {
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
					<div>{users.map((x) => <p key={Math.random()}>{x.login}</p>)}</div>
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
