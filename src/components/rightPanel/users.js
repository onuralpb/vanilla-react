import React, { Component } from "react";
import Loader from "react-loaders";

export default class users extends Component {
	state = {
		users     : [],
		isLoading : true,
	};
	componentDidMount() {
		setTimeout(() => {
			fetch("http://localhost:4000/users").then((data) => data.json()).then((users) => {
				this.setState({
					users,
					isLoading : false,
				});
			});
		}, 500);
	}
	render() {
		return (
			<div>
				<h1>Users</h1>
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
							{this.state.isLoading ? (
								<tr>
									<td colSpan='6'>
										<div className='loadingPanel'>
											<Loader type='ball-beat' />
										</div>
									</td>
								</tr>
							) : (
								this.state.users.map((user) => (
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
