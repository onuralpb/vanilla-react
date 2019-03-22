import React, { Component } from "react";
import Loader from "react-loaders";
import product_1 from "../../assets/img/product_1.png";
import product_2 from "../../assets/img/product_2.png";
import product_3 from "../../assets/img/product_3.png";
import product_4 from "../../assets/img/product_4.png";
import product_5 from "../../assets/img/product_5.png";
import product_6 from "../../assets/img/product_6.png";
import product_7 from "../../assets/img/product_7.png";
import product_8 from "../../assets/img/product_8.png";

import { getProductList, addToBasket, inTheBasket } from "../../actions/productsActions";
import { connect } from "react-redux";
import { addAnimate } from "../../components/HOC/animate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";

export class products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value : "",
		};

		this.onChange = this.onChange.bind(this);
		this.increasePrice = this.increasePrice.bind(this);
		this.decreasePrice = this.decreasePrice.bind(this);
	}
	componentDidMount() {
		this.props._getProductList();
	}

	_addToBasket = (e, id) => {
		const _input = document.querySelector(`#a${id} .input-group input`);
		const productsInBasket = this.props.products.productsInBasket;
		let founded = false;
		for (let i = 0; i < productsInBasket.length; i++) {
			if (productsInBasket[i].id === id) {
				founded = true;
				this.props._inTheBasket(id, parseInt(_input.value));
				// this.notify ();
				break;
			}
		}
		if (!founded) {
			this.props._addToBasket(id, parseInt(_input.value));
		}
		let btnBasket = document.querySelector(".btn-basket");
		let badgeInBasket = document.querySelector(".btn-basket .badge");
		let iconInBasket = document.querySelector(".btn-basket i");
		addAnimate(e.target, "rubberBand", "faster");
		addAnimate(btnBasket, "swing", "faster");
		addAnimate(badgeInBasket, "flipInX", "faster");
		addAnimate(iconInBasket, "wobble", "faster");
	};

	notify = () =>
		toast.warn("Bu ürünü daha önce eklediniz.", {
			position : toast.POSITION.BOTTOM_RIGHT,
		});

	onChange(e) {
		e.preventDefault();
	}

	decreasePrice(id) {
		const _input = document.querySelector(`#a${id} .input-group input`);
		const iconInButton = document.querySelector(`#a${id} .btn-minus i`);
		if (_input.value > 1) {
			--_input.value;
		}
		addAnimate(iconInButton, "rubberBand", "faster");
	}

	increasePrice(id) {
		const _input = document.querySelector(`#a${id} .input-group input`);
		const iconInButton = document.querySelector(`#a${id} .btn-plus i`);
		++_input.value;
		addAnimate(iconInButton, "rubberBand", "faster");
	}

	render() {
		const { products } = this.props;
		return (
			<div>
				<h1>Products</h1>
				{this.props.products.error && `(Veri alınamadı)`}
				<div className='row'>
					{products.fetching ? (
						<div className='loadingPanel'>
							<Loader type='ball-beat' />
						</div>
					) : (
						products.list.map((product) => (
							<div className='col-lg-6 productBox' key={product.id} id={"a" + product.id}>
								<div className='panel'>
									<div className='row'>
										<div className='col-lg-3'>
											<img src={product.image_url} alt='' width='70' height='70' />
										</div>
										<div className='col-lg-9'>
											{product.title}
											<br />
											{product.price} TL
											<br />
											<div className='row justify-content-start mb-2 mt-2'>
												<div className='col-6'>
													<InputGroup size='sm'>
														<InputGroup.Prepend>
															<Button
																className='btn-minus'
																variant='light'
																onClick={() => this.decreasePrice(product.id)}
															>
																<i className='fas fa-minus' />
															</Button>
														</InputGroup.Prepend>
														<FormControl
															as='input'
															type='text'
															aria-describedby='basic-addon1'
															className='border-light text-center'
															maxLength='3'
															value='1'
															onChange={(e) => this.onChange(e)}
														/>
														<InputGroup.Append>
															<Button
																className='btn-plus'
																variant='light'
																onClick={() => this.increasePrice(product.id)}
															>
																<i className='fas fa-plus' />
															</Button>
														</InputGroup.Append>
													</InputGroup>
												</div>
												<div className='col-4'>
													<button className='btn btn-primary btn-sm' onClick={(e) => this._addToBasket(e, product.id)}>
														ADD
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>
				<ToastContainer autoClose={2000} />
			</div>
		);
	}
}

const mapStateToProps = ({ products }) => {
	return {
		products,
	};
};

const mapDispatchToProps = {
	_getProductList : getProductList,
	_addToBasket    : addToBasket,
	_inTheBasket    : inTheBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(products);
