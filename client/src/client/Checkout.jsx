import React, { Component, Fragment } from 'react';
import axios from 'axios';
export default class Checkout extends Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.handlePreviousData = this.handlePreviousData.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state = {
			userId: '',
			firstName: '',
			lastName: '',
			carts: [],
			email: '',
			address: '',
			address2: '',
			country: '',
			zip: '',
			total: 0,
			paymentMethod: 'Credit card',
			cardName: '',
			cardNumber: 0,
			expiration: '',
			cvv: ''
		};
	}

	componentDidMount() {
		this.handlePreviousData();
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handlePreviousData() {
		const cartLocalStorage = localStorage.getItem('Cart');
		const _idLocalStorage = localStorage.getItem('_id');
		if (!cartLocalStorage) {
			axios
				.get('http://localhost:2020/cart/' + JSON.parse(_idLocalStorage))
				.then((res) => {
					this.setState(() => ({
						carts: res.data.carts,
						firstName: res.data.username,
						address: res.data.address
					}));
					let total = 0;
					this.state.carts.forEach((value) => {
						total += value.price * value.quantity;
					});
					this.setState(() => ({ total }));
				})
				.catch((err) => console.log(err));
		} else {
			const JSON_id = JSON.parse(_idLocalStorage);
			const JSONCart = JSON.parse(cartLocalStorage);
			this.setState(() => ({ carts: JSONCart, userId: JSON_id }));
			const cart = JSON.parse(localStorage.getItem('Cart'));
			let total = 0;
			cart.forEach(function(value, index) {
				total += value.total;
			});
			this.setState(() => ({ total }));
			axios
				.get('http://localhost:2020/cart/' + JSON_id)
				.then((res) => {
					this.setState({
						firstName: res.data.firstName,
						lastName: res.data.lastName,
						email: res.data.email,
						address: res.data.address,
						address2: res.data.address2,
						country: res.data.country,
						zip: res.data.zip
					});
				})
				.catch((err) => console.log(err));
		}
	}

	handleFormSubmit(e) {
		e.preventDefault();
		axios
			.post('http://localhost:2020/checkout', {
				userId: this.state.userId,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				carts: this.state.carts,
				email: this.state.email,
				address: this.state.address,
				address2: this.state.address2,
				country: this.state.country,
				zip: this.state.zip,
				total: this.state.total,
				paymentMethod: this.state.paymentMethod,
				cardName: this.state.cardName,
				cardNumber: this.state.cardNumber,
				expiration: this.state.expiration,
				cvv: this.state.cvv
			})
			.then((res) => {
				console.log(res);
				localStorage.removeItem('Cart');
				window.location.assign('/transactionList');
			})
			.catch((err) => console.log(err));
	}

	render() {
		const style = {
			marginTop: '50px'
		};
		const bottomStyle = {
			marginBottom: '100px'
		};
		return (
			<Fragment>
				{/* Custom styles for this template */}
				<div className='container'>
					<div className='py-5 text-center' style={style}>
						<h2 className='kryptonite-text '>Checkout Form</h2>
					</div>
					<div className='row'>
						<div className='col-md-4 order-md-2 mb-4'>
							<h4 className='d-flex justify-content-between align-items-center mb-3'>
								<span className='kryptonite-text'>Your cart</span>
								<span className='badge badge-secondary badge-pill'>{this.state.carts.length}</span>
							</h4>
							<ul className='list-group mb-3'>
								{this.state.carts.map((product) => {
									return (
										<li className='list-group-item d-flex justify-content-between lh-condensed' key={product._id}>
											<div>
												<h6 className='kryptonite-checkout-text my-0'>{product.title}</h6>
												<small className='text-muted'>{product.description}</small>
											</div>
											<span className='text-muted'>{product.price}</span>
										</li>
									);
								})}
								<li className='list-group-item d-flex justify-content-between'>
									<span className='text-danger'>Total (USD)</span>
									<strong className='kryptonite-checkout-text'>{this.state.total}</strong>
								</li>
							</ul>
							<div className='input-group'>
								<input type='text' className='form-control' name='promo' onChange={this.onChange} placeholder='Promo code' />
							</div>
							<button
								onClick={() => this.setState(() => ({ total: this.state.total / 2 }))}
								type='submit'
								className='btn btn-secondary btn-block'
							>
								Redeem
							</button>
						</div>
						<div className='col-md-8 order-md-1'>
							<h4 className='kryptonite-text mb-3'>Billing address</h4>
							{/* -------------------------------------------------------------------------------------------------- */}
							<form onSubmit={this.handleFormSubmit}>
								<div className='row'>
									<div className='col-md-6 mb-3'>
										<label htmlFor='firstName'>First name</label>
										<input
											type='text'
											className='form-control'
											id='firstName'
											name='firstName'
											onChange={this.onChange}
											value={this.state.firstName}
										/>
										<div className='invalid-feedback'>Valid first name is .</div>
									</div>
									<div className='col-md-6 mb-3'>
										<label htmlFor='lastName'>Last name</label>
										<input
											type='text'
											className='form-control'
											id='lastName'
											name='lastName'
											onChange={this.onChange}
											value={this.state.lastName}
										/>
										<div className='invalid-feedback'>Valid last name is .</div>
									</div>
								</div>
								<div className='mb-3'>
									<label htmlFor='email'>
										Email <span className='text-muted'>(Optional)</span>
									</label>
									<input
										type='email'
										className='form-control'
										id='email'
										name='email'
										onChange={this.onChange}
										value={this.state.email}
									/>
									<div className='invalid-feedback'>Please enter a valid email address for shipping updates.</div>
								</div>
								<div className='mb-3'>
									<label htmlFor='address'>Address</label>
									<input
										type='text'
										className='form-control'
										id='address'
										name='address'
										value={this.state.address}
										onChange={this.onChange}
										placeholder='1234 Main St'
									/>
									<div className='invalid-feedback'>Please enter your shipping address.</div>
								</div>
								<div className='mb-3'>
									<label htmlFor='address2'>
										Address 2 <span className='text-muted'>(Optional)</span>
									</label>
									<input
										type='text'
										className='form-control'
										id='address2'
										name='address2'
										onChange={this.onChange}
										placeholder='Apartment or suite'
										value={this.state.address2}
									/>
								</div>
								<div className='row'>
									<div className='col-md-5 mb-3'>
										<label htmlFor='country'>Country</label>
										<input
											type='text'
											className='form-control'
											id='country'
											name='country'
											onChange={this.onChange}
											placeholder='United States'
											value={this.state.country}
										/>
										<div className='invalid-feedback'>Please select a valid country.</div>
									</div>
									<div className='col-md-7 mb-3'>
										<label htmlFor='zip'>Zip</label>
										<input
											type='text'
											className='form-control'
											id='zip'
											name='zip'
											onChange={this.onChange}
											placeholder='14522'
											value={this.state.zip}
										/>
										<div className='invalid-feedback'>Zip code .</div>
									</div>
								</div>
								<hr className='mb-4' />
								<div className='custom-control custom-checkbox'>
									<input type='checkbox' className='custom-control-input' id='same-address' />
									<label className='custom-control-label' htmlFor='same-address'>
										Shipping address is the same as my billing address
									</label>
								</div>
								<div className='custom-control custom-checkbox'>
									<input type='checkbox' className='custom-control-input' id='save-info' />
									<label className='custom-control-label' htmlFor='save-info'>
										Save this information for next time
									</label>
								</div>
								<hr className='mb-4' />
								<h4 className='kryptonite-text mb-3'>Payment</h4>
								<div className='d-block my-3'>
									<div className='custom-control custom-radio'>
										<input
											id='credit'
											name='paymentMethod'
											type='radio'
											onChange={this.onChange}
											value='Credit card'
											className='custom-control-input'
											defaultChecked
										/>
										<label className='custom-control-label' htmlFor='credit'>
											Credit card
										</label>
									</div>
									<div className='custom-control custom-radio'>
										<input
											id='debit'
											name='paymentMethod'
											type='radio'
											onChange={this.onChange}
											value='Debit card'
											className='custom-control-input'
										/>
										<label className='custom-control-label' htmlFor='debit'>
											Debit card
										</label>
									</div>
									<div className='custom-control custom-radio'>
										<input
											id='paypal'
											name='paymentMethod'
											type='radio'
											onChange={this.onChange}
											value='PayPal'
											className='custom-control-input'
										/>
										<label className='custom-control-label' htmlFor='paypal'>
											PayPal
										</label>
									</div>
								</div>
								<div className='row'>
									<div className='col-md-6 mb-3'>
										<label htmlFor='cc-name'>Name on card</label>
										<input
											type='text'
											name='cardName'
											value={this.state.cardName}
											onChange={this.onChange}
											className='form-control'
											id='cc-name'
										/>
										<small className='text-muted'>Full name as displayed on card</small>
										<div className='invalid-feedback'>Name on card is</div>
									</div>
									<div className='col-md-6 mb-3'>
										<label htmlFor='cc-number'>Credit card number</label>
										<input
											type='number'
											name='cardNumber'
											value={this.state.cardNumber}
											onChange={this.onChange}
											className='form-control'
											id='cc-number'
										/>
										<div className='invalid-feedback'>Credit card number is</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-md-3 mb-3'>
										<label htmlFor='cc-expiration'>Expiration</label>
										<input
											type='date'
											name='expiration'
											value={this.state.expiration}
											onChange={this.onChange}
											className='form-control'
											id='cc-expiration'
										/>
										<div className='invalid-feedback'>Expiration date</div>
									</div>
									<div className='col-md-3 mb-3'>
										<label htmlFor='cc-cvv'>CVV</label>
										<input
											type='text'
											name='cvv'
											value={this.state.cvv}
											onChange={this.onChange}
											className='form-control'
											id='cc-cvv'
										/>
										<div className='invalid-feedback'>Security code</div>
									</div>
								</div>
								<hr className='mb-4' />
								<button style={bottomStyle} className='kryptonite-button btn btn-success btn-lg btn-block' type='submit'>
									Continue to checkout
								</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
