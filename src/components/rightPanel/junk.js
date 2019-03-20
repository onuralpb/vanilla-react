import React, { Component } from "react";

export default class junk extends Component {
	render() {
		console.log("dfgsdfgdf");
		console.log(this.props.length);
		return (
			<div>
				<ul>
					<li>{this.props === null || undefined ? "Veri henüz bağlanmadı" : "veri geldi"}</li>
				</ul>
			</div>
		);
	}
}
