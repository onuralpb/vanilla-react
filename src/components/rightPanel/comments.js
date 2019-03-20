import React, { Component } from "react";
import { Modal, Pagination } from "react-bootstrap";

import Placeholder from "../placeholder";

export default class comments extends Component {
	constructor() {
		super();
		this.state = {
			comments       : [],
			isLoading      : true,
			isEditMode     : false,
			isEditingRowId : null,
			modalShow      : false,
			pageLimit      : 20,
			currentPage    : 1,
			totalPage      : null,
		};
		console.log("constructor");
	}

	componentDidMount() {
		const { pageLimit, currentPage } = this.state;
		fetch(`http://localhost:4000/comments`).then((data) => data.json()).then((data) => {
			this.setState({
				totalPage :
					Math.floor(data.length / this.state.pageLimit) + (data.length % this.state.pageLimit === 0 ? "" : 1),
			});
		});
		setTimeout(() => {
			fetch(`http://localhost:4000/comments?_page=${currentPage}&_limit=${pageLimit}`)
				.then((data) => data.json())
				.then((comments) => {
					this.setState({
						comments  : comments,
						isLoading : false,
					});
				});
		}, 1000);
		console.log("componentDidMount");
	}

	removeAfterAnimate = (el, animation, speed) => {
		let _this = document.getElementById(`${el}`);
		_this.classList.add("animated", animation, speed);
		_this.addEventListener("animationend", () => _this.remove());
	};

	handleDelete = (userId) => {
		fetch(`http://localhost:4000/comments/${userId}`, { method: "DELETE" })
			.then((data) => data.json())
			.then(() => {
				let updatedList = this.state.comments.slice();
				updatedList.splice(userId, 1);
				this.setState({
					comments : updatedList,
				});
				this.removeAfterAnimate(userId, "zoomOut", "faster");
			})
			.catch((err) => {
				console.error("err", err);
			});
	};

	handleSave = (e, userId) => {
		e.preventDefault();
		e.persist();
		fetch(`http://localhost:4000/comments/${userId}`, {
			method  : "PUT",
			headers : {
				"Content-Type" : "application/json",
			},
			body    : JSON.stringify({
				postId : `${e.target.parentNode.parentNode.childNodes[0].children[0].innerText}`,
				id     : `${e.target.parentNode.parentNode.childNodes[0].children[2].innerText}`,
				name   : `${e.target.parentNode.parentNode.childNodes[1].children[1].value}`,
				email  : `${e.target.parentNode.parentNode.childNodes[1].children[4].value}`,
				body   : `${e.target.parentNode.parentNode.childNodes[2].children[1].value}`,
			}),
		})
			.then((data) => data.json())
			.then(() => {
				this.setState({
					isEditMode     : !this.state.isEditMode,
					isEditingRowId : null,
				});

				let row = document.querySelector(`#${CSS.escape(userId)}`);
				let spans = row.querySelectorAll("span");
				let inputs = row.querySelectorAll(".form-control");
				for (let i = 0; i < inputs.length; i++) {
					if (spans[i].className === "_email") {
						spans[i].innerHTML = `<a href="mailto:${inputs[i].value}" class="listLink">${inputs[i].value}</a>`;
					}
					else {
						spans[i].textContent = inputs[i].value;
					}

					spans[i].style.display = "inline-block";
					inputs[i].remove();
				}
			})
			.catch((err) => {
				console.error("err", err);
			});
	};
	handleUpdate = (userId) => {
		this.setState({
			isEditMode     : !this.state.isEditMode,
			isEditingRowId : userId,
		});
		let row = document.querySelector(`#${CSS.escape(userId)}`);
		let spans = row.querySelectorAll("span");
		for (let i = 0; i < spans.length; i++) {
			let keepText = spans[i].innerText;
			let input = `<input type='text' name='${spans[i]
				.className}' value='${keepText}' class='form-control display-block' />`;
			let textarea = `<textarea class='form-control display-block' name='${spans[i].className}'>${keepText}</textarea>`;
			spans[i].style.display = "none";
			if (spans[i].classList.contains("_body")) {
				spans[i].insertAdjacentHTML("afterend", textarea);
			}
			else {
				spans[i].insertAdjacentHTML("afterend", input);
			}
		}
	};

	getUpdateDataList = () => {
		this.setState({
			isLoading : true,
		});
		setTimeout(() => {
			let URI = `http://localhost:4000/comments?_page=${this.state.currentPage}&_limit=${this.state.pageLimit}`;
			console.log(URI);
			fetch(URI).then((data) => data.json()).then((comments) => {
				this.setState({
					comments  : comments,
					isLoading : false,
				});
			});
		}, 300);
	};

	nextPage = () => {
		this.setState({
			currentPage : this.state.currentPage + 1,
		});
		this.getUpdateDataList();
	};
	prevPage = () => {
		this.setState({
			currentPage : this.state.currentPage - 1,
		});
		this.getUpdateDataList();
	};

	firstPage = () => {
		this.setState({
			currentPage : 1,
		});
		this.getUpdateDataList();
	};
	lastPage = () => {
		this.setState({
			currentPage : this.state.totalPage,
		});
		this.getUpdateDataList();
	};
	itsOwnPage(number) {
		this.setState({
			currentPage : number,
		});
		this.getUpdateDataList();
	}
	componentDidUpdate() {
		console.log("componentDidUpdate");
	}
	componentWillUnmount() {
		console.log("componentWillUnmount");
	}

	render() {
		console.log("render");
		const { isEditMode, isEditingRowId } = this.state;
		let modalClose = () => this.setState({ modalShow: false });

		const AddPagination = () => {
			let items = [];
			for (let number = 1; number <= this.state.totalPage; number++) {
				items.push(
					<Pagination.Item
						key={number}
						active={number === this.state.currentPage}
						onClick={() => this.itsOwnPage(number)}
					>
						{number}
					</Pagination.Item>
				);
			}
			return (
				<div className='d-flex paginationWrapper'>
					<Pagination className='mx-auto'>
						<Pagination.First onClick={this.firstPage} disabled={this.state.currentPage === 1} />
						<Pagination.Prev onClick={this.prevPage} disabled={this.state.currentPage === 1} />
						{items}
						<Pagination.Next onClick={this.nextPage} disabled={this.state.currentPage === this.state.totalPage} />
						<Pagination.Last onClick={this.lastPage} disabled={this.state.currentPage === this.state.totalPage} />
					</Pagination>
				</div>
			);
		};
		return (
			<div>
				<div className='d-flex justify-content-between '>
					<div className='p-2'>
						<h1>Comments</h1>
					</div>
					<div className='p-2'>
						<button
							type='button'
							className='btn btn-primary float-lg-right'
							onClick={() => this.setState({ modalShow: true })}
						>
							Ekle
						</button>
						<Modal
							size='lg'
							// dialogClassName='modal-90w'
							show={this.state.modalShow}
							onHide={modalClose}
							aria-labelledby='modal-title'
						>
							<Modal.Header closeButton>
								<Modal.Title id='modal-title'>Large Modal</Modal.Title>
							</Modal.Header>
							<Modal.Body>...</Modal.Body>
						</Modal>
					</div>
				</div>
				<AddPagination />
				<div className='panel'>
					<div className='divTable'>
						<div className='divTableHead'>
							<div className='row'>
								<div className='col-lg-2'>postId / id</div>
								<div className='col-lg-4'>name / email</div>
								<div className='col-lg-4'>body</div>
								<div className='col-lg-2 text-right' />
							</div>
						</div>
						{this.state.isLoading ? (
							<Placeholder />
						) : (
							this.state.comments.map((comment) => (
								<div
									className={`divTableRow ${isEditingRowId === comment.id ? "rounded border border-primary" : ""}`}
									key={comment.id}
									id={comment.id}
								>
									<div className='row'>
										<div className='col-lg-2'>
											<span className='_postId'>{comment.postId}</span> - <span className='_id'>{comment.id}</span>
										</div>
										<div className='col-lg-4'>
											<span className='_name'>{comment.name}</span>
											<br />
											<span className='_email'>
												<a href={`mailto:${comment.email}`} className='listLink'>
													{comment.email}
												</a>
											</span>
										</div>
										<div className='col-lg-4'>
											<span className='_body'>{comment.body}</span>
										</div>

										{isEditingRowId === comment.id ? (
											<div className='col-lg-2 text-right btnGroupTools'>
												<button
													type='Submit'
													className='btn btn-success'
													title='Kaydet'
													onClick={(e) => this.handleSave(e, comment.id)}
												>
													KAYDET
												</button>
											</div>
										) : null}

										{isEditMode ? (
											<div className='col-lg-2 text-right btnGroupTools' />
										) : (
											<div className='col-lg-2 text-right btnGroupTools'>
												<button className='btn btn-navy' title='Sil' onClick={() => this.handleDelete(comment.id)}>
													<i className='far fa-trash-alt' />
												</button>
												<button className='btn btn-navy' title='Güncelle' onClick={() => this.handleUpdate(comment.id)}>
													<i className='far fa-edit' />
												</button>
											</div>
										)}
									</div>
								</div>
							))
						)}
					</div>
				</div>
				<AddPagination />
			</div>
		);
	}
}
