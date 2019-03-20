import React, { Component } from "react";
import Loader from "react-loaders";

export default class posts extends Component {
	componentDidMount() {
		setTimeout(() => {
			fetch("http://localhost:4000/posts?userId=1").then((data) => data.json()).then((posts) => {
				this.props.dataFromPost(posts);
			});
		}, 1000);
	}
	render() {
		console.log(this);
		return (
			<div>
				<div className='row'>
					<div className='col-lg-4'>
						<h1>Posts</h1>
					</div>
					<div className='col-lg-8' />
				</div>
				<div className='panel'>
					<table className='table table-hover'>
						<thead>
							<tr>
								<th>userId</th>
								<th>id</th>
								<th>title</th>
								<th>body</th>
							</tr>
						</thead>
						<tbody>
							{this.props.isLoading ? (
								<tr>
									<td colSpan='4'>
										<div className='loadingPanel'>
											<Loader type='ball-beat' />
										</div>
									</td>
								</tr>
							) : (
								this.props.posts.map((post) => (
									<tr key={post.id}>
										<td>{post.userId}</td>
										<td>{post.id}</td>
										<td>{post.title}</td>
										<td>{post.body}</td>
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
