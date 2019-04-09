import React, { Component } from "react";
import Loader from "react-loaders";
import { connect } from "react-redux";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { getUsersList, addUser, updateUser, deleteUser, searchUser } from "../../actions/usersActions";
export class users extends Component {
	componentDidMount() {
		this.props._getUsersList();
	}

	render() {
		console.log("users", this);
		const { users } = this.props;
		return (
			<div>
				<h1>Users</h1>
				{users.error && `(Veri alınamadı)`}
				<InputGroup className='mb-3'>
					<FormControl
						placeholder='Recipient&#39;s username'
						aria-label='Recipient&#39;s username'
						aria-describedby='basic-addon2'
					/>
					<InputGroup.Append>
						<Button variant='danger'>dssfd</Button>
					</InputGroup.Append>
				</InputGroup>
				<div className='panel'>
					<table className='table table-hover'>
						<thead>
							<tr>
								<th>id</th>
								<th>name / username / email</th>
								<th>address</th>
								<th>phone</th>
								<th>website</th>
								<th>company</th>
							</tr>
						</thead>
						<tbody>
							{users.fetching ? (
								<tr>
									<td colSpan='6'>
										<div className='loadingPanel'>
											<Loader type='ball-beat' />
										</div>
									</td>
								</tr>
							) : (
								users.list.map((user) => (
									<tr key={user.id}>
										<td>{user.id}</td>
										<td>
											{user.name} - {user.username}
											<br />
											{user.email}
										</td>
										<td>
											{user.address.street}
											{user.address.suit}
											{user.address.city} <br />
											{user.address.zipcode} <br />
											{user.address.geo.lat} | {user.address.geo.lng}
										</td>
										<td>{user.phone}</td>
										<td>{user.website}</td>
										<td>
											{user.company.name} <br />
											{user.company.catchPhrase} <br />
											{user.company.bs}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ users }) => {
	return {
		users,
	};
};

const mapDispatchToProps = {
	_getUsersList : getUsersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(users);
