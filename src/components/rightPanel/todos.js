import React, { Component } from "react";
import TodosList from "./todosList";
export default class todos extends Component {
	state = {
		todos     : [],
		isLoading : true,
	};
	componentWillMount() {
		setTimeout(() => {
			fetch("http://localhost:4000/todos?userId=1").then((data) => data.json()).then((todos) => {
				this.setState({
					todos,
					isLoading : false,
				});
			});
		}, 500);
	}
	render() {
		return (
			<div>
				<h1>Todos</h1>
				<div className='panel'>
					<TodosList {...this.state} />
				</div>
			</div>
		);
	}
}
