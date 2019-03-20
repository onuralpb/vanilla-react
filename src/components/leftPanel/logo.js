import React, { Component } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/img/logo.svg";

export default class logo extends Component {
	render() {
		return (
			<div className='logoContent'>
				<Link to='/'>
					<img src={Image} alt='Flatify' />
					<span>Flatify</span>
				</Link>
			</div>
		);
	}
}
