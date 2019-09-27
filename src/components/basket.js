/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { Button, Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteFromBasket } from '../actions/productsActions';

class basket extends Component {
	_deleteFromBasket = id => {
		this.props._deleteFromBasket(id);
	};
	render() {
		const productsInBasket = this.props.products.productsInBasket;
		const list = this.props.products.list;
		let sumPrice = 0;
		return (
			<div>
				<OverlayTrigger
					trigger="click"
					placement="bottom"
					overlay={
						<Popover id={`popover-positioned-bottom`}>
							<Popover.Title as="h3">{`Sepetinizde ${productsInBasket.length} adet ürün var`}</Popover.Title>
							<Popover.Content>
								{productsInBasket.map(product => {
									for (let i = 0; i < list.length; i++) {
										if (list[i].id === product.id) {
											console.log(list[i]);
											console.log(product);
											sumPrice += list[i].price * product.piece;
											console.log(sumPrice);
											return (
												<div className="productBasket" key={list[i].id * Math.random()}>
													<div className="row">
														<div className="col-lg-3">
															<img src={list[i].image_url} alt="" width="50" height="50" />
														</div>
														<div className="col-lg-9">
															{list[i].title}
															<br />
															<span className="badge badge-info">{product.piece > 0 && product.piece}</span> x{' '}
															{list[i].price} TL
														</div>
													</div>
													<button
														className="btn btn-danger"
														title="Kaldır"
														onClick={e => this._deleteFromBasket(list[i].id)}
													>
														<i className="far fa-trash-alt" />
													</button>
												</div>
											);
										}
									}
								})}
								<div className="sumPriceContent">Toplam : {sumPrice} TL</div>
							</Popover.Content>
						</Popover>
					}
					rootClose={true}
					rootCloseEvent="click"
				>
					<Button variant="warning" className="btn-basket">
						<i className="fas fa-cart-arrow-down" />
						<Badge variant="dark">{productsInBasket.length}</Badge>
						<span className="sr-only">pruducts in the basket</span>
					</Button>
				</OverlayTrigger>
			</div>
		);
	}
}

const mapStateToProps = ({ products }) => {
	return {
		products,
	};
};

// const mapStateToProps = (state) => {
// 	return {
// 		products:state.products,
// 	};
// };

const mapDispatchToProps = {
	_deleteFromBasket : deleteFromBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(basket);
