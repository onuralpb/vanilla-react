import React, { Component } from "react";
import Loader from "react-loaders";
import { getPhotoList } from "../../actions/photosActions";
import { connect } from "react-redux";
export class photos extends Component {
	componentDidMount() {
		console.log("componentDidMount");
		this.props.onGetPhotos();
	}

	render() {
		const { photos } = this.props;
		return (
			<div>
				<h1>Photos</h1>
				<div className='panel'>
					<table className='table table-hover'>
						<thead>
							<tr>
								<th>thumbnailUrl</th>
								<th>albumId</th>
								<th>id</th>
								<th>title</th>
								<th>url</th>
							</tr>
						</thead>
						<tbody>
							{photos.fetching ? (
								<tr>
									<td colSpan='5'>
										<div className='loadingPanel'>
											<Loader type='ball-beat' />
										</div>
									</td>
								</tr>
							) : (
								photos.list.map((photo) => (
									<tr key={photo.id}>
									<td>
											<img src={photo.thumbnailUrl} alt='' width='70' height='70' />
										</td>
										<td>{photo.albumId}</td>
										<td>{photo.id}</td>
										<td>{photo.title}</td>
										<td>{photo.url}</td>
										
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

const mapStateToProps = (state) => {
	return {
		...state,
	};
};

const mapDispatchToProps = {
	onGetPhotos : getPhotoList,
};

export default connect(mapStateToProps, mapDispatchToProps)(photos);
