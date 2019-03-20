import React, { Component } from "react";

export default class dashboard extends Component {
	// eslint-disable-next-line no-useless-constructor
	constructor(props) {
		super(props);
		console.log("dashboard.js > props in constructor : ", props);
	}
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
			</div>
		);
	}
}
