import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../assets/img/logo.svg';

export default class logo extends Component {
	render() {
		return (
			<div className="logoContent">
				<Link to="/">
					<img src={`img/${Image}`} alt="Flatify" />
					<span className="d-xs-none d-md-none d-lg-block">Flatify</span>
				</Link>
			</div>
		);
	}
}
