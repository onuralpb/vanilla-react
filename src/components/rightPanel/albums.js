import React, { Component } from "react";
import Loader from "react-loaders";
import { getAlbumList } from "../../actions/albumsActions";
import { connect } from "react-redux";

export class albums extends Component {
	componentDidMount() {
		console.log("componentDidMount");
		this.props.onGetAlbums();
	}
	render() {
		console.log("albums.js > render");
		console.log("albums.js > this.props in render : ", this.props);
		const { albums } = this.props;
		return (
			<div>
				<h1>Albums</h1>
				<div className='panel'>
					<table className='table table-hover'>
						<thead>
							<tr>
								<th>userId</th>
								<th>id</th>
								<th>title</th>
							</tr>
						</thead>
						<tbody>
							{albums.fetching ? (
								<tr>
									<td colSpan='3'>
										<div className='loadingPanel'>
											<Loader type='ball-beat' />
										</div>
									</td>
								</tr>
							) : (
								albums.list.map((album) => (
									<tr key={album.id}>
										<td>{album.userId}</td>
										<td>{album.id}</td>
										<td>{album.title}</td>
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
	onGetAlbums : getAlbumList,
};

export default connect(mapStateToProps, mapDispatchToProps)(albums);
