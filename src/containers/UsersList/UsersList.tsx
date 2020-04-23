import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { User, UserState } from '../../store/ducks/users/types';
import * as UserActions from './../../store/ducks/users/actionCreators';

interface StateProps {
	users: User[];
}

interface DispatchProps {
	fetchUsers(): void;
}

type UsersProps = StateProps & DispatchProps;

class UsersList extends React.Component<UsersProps> {
	async componentDidMount() {
		// const { fetchUsers } = this.props;
		const response = await fetch('https://api.github.com/users?since100');
		const data = await response.json();
		console.log(data);
		// fetchUsers();
	}

	render() {
		const { users } = this.props;

		if (!users) {
			return <div>Show spinner and then users...</div>;
		}

		return (
			<div>
				<ul>
					{users.map((u) => {
						u.id;
					})}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state: UserState): StateProps => {
	return {
		users: state.users,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(UsersList);
