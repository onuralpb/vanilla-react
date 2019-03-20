import React, { Component } from "react";

export default class footer extends Component {
	constructor() {
		super();
		this.state = {
			danger  : "",
			warning : "",
			info    : "",
		};
	}
	changeBgDanger = () => {
		let el = document.querySelector(".listContainer");
		if (el.classList.contains("bgDanger")) {
			el.classList.remove("bgDanger");
		}
		else {
			el.classList.add("bgDanger");
		}
		// this.setState (
		//   {
		//     danger: 'bgDanger',
		//   },
		//   () => console.log ('state danger :' + this.state.danger)
		// );
	};
	changeBgWarning = () => {
		let el = document.querySelector(".listContainer");
		if (el.classList.contains("bgWarning")) {
			el.classList.remove("bgWarning");
		}
		else {
			el.classList.add("bgWarning");
		}
	};
	changeBgInfo = () => {
		let el = document.querySelector(".listContainer");
		if (el.classList.contains("bgInfo")) {
			el.classList.remove("bgInfo");
		}
		else {
			el.classList.add("bgInfo");
		}
	};
	render() {
		return (
			<div className='row'>
				<div className='col'>
					<button onClick={this.changeBgDanger} className='btn btn-danger'>
						<i className='fab fa-artstation' /> Submit
					</button>
				</div>
				<div className='col'>
					<button onClick={this.changeBgWarning} className='btn btn-warning'>
						<i className='fab fa-codepen' /> Submit
					</button>
				</div>
				<div className='col'>
					<button onClick={this.changeBgInfo} className='btn btn-info'>
						<i className='fas fa-biohazard' /> Submit
					</button>
				</div>
			</div>
		);
	}
}
