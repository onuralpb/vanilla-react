import React, { Component } from "react";
import Loader from "react-loaders";

const loaderHOC = (WrappedComponent, field) => {
	return class loaderHOC extends Component {
		render() {
			console.log(this);
			return this.props[field].length === 0 ? (
				<div className='panel'>
					<table className='table table-hover'>
						<tbody>
							<tr>
								<td colSpan='4'>
									<div className='loadingPanel'>
										<Loader type='ball-beat' />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			) : (
				<WrappedComponent {...this.props} />
			);
		}
	};
};

export default loaderHOC;
