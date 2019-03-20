import React, { Component } from "react";
import Loader from "react-loaders";

export default class placeholder extends Component {
	render() {
		return (
			<div className='divTableRow loaderContent'>
				<div className='loadingPanel'>
					<Loader type='ball-beat' />
				</div>
			</div>
		);
	}
}
