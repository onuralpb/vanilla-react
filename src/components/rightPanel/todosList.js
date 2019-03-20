import React, { Component } from "react";
import LoaderHOC from "../HOC/loaderHOC";

class todosList extends Component {
	render() {
		console.log(this);
		return (
			<table className='table table-hover'>
				<thead>
					<tr>
						<th>userId</th>
						<th>id</th>
						<th>title</th>
						<th>completed</th>
					</tr>
				</thead>
				<tbody>
					{this.props.todos.map((todo) => (
						<tr key={todo.id}>
							<td>{todo.userId}</td>
							<td>{todo.id}</td>
							<td>{todo.title}</td>
							<td>
								{todo.completed ? (
									<div className='fa-2x'>
										<i className='fas fa-check-circle todoDone' />
									</div>
								) : (
									<div className='fa-2x'>
										<i className='far fa-check-circle todoNotDone' />
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}
export default LoaderHOC(todosList,'todos');
