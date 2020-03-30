import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Image1 from '../res/images/shoot out.gif';
import Image2 from '../res/images/f.gif';
import Image3 from '../res/images/stars.gif';
import Harrier from '../res/images/harrier.jpg';
import Image4 from '../res/images/pushup.gif';
import Image5 from '../res/images/snow.gif';
import Image6 from '../res/images/shoot out.gif';
import Carousel from 'react-bootstrap/Carousel';
import ProductDescription from './ProductDescription';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
class Index extends Component {
	constructor(props) {
		super(props);
		this.isUser = this.isUser.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.renderProduct = this.renderProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.addExclusiveProductToCart = this.addExclusiveProductToCart.bind(this);
		this.state = {
			product: [],
			content: [],
			sendedData: [],
			quantity: 1,
			total: 0,
			modalStatus: false,
			time: 0
		};
	}

	componentDidMount() {
		this.renderProduct();
		// alert("new move! how about learn german?");
	}

	renderProduct() {
		axios.get('http://localhost:2020/product').then((res) => {
			this.setState({ product: res.data });
		});
	}

	isUser(res) {
		let userRole = localStorage.getItem('Role');
		if (userRole) {
			let JSONUserRole = JSON.parse(userRole);
			if (JSONUserRole === 'User') {
				return (
					<button
						disabled={res.quantity === 0}
						onClick={() => this.addToCart(res)}
						className='kryptonite-button btn btn-outline-danger'
					>
						Add To Cart
					</button>
				);
			}
		}
	}

	handleModalClose(res) {
		this.setState(() => ({
			modalStatus: !this.state.modalStatus,
			sendedData: res
		}));
	}

	deleteProduct(productId) {
		axios
			.delete('http://localhost:2020/product/' + productId)
			.then((res) => {
				window.location.assign('/');
			})
			.catch((err) => console.log(err));
	}

	addExclusiveProductToCart() {
		let oldItems = JSON.parse(localStorage.getItem('Cart')) || [];
		let newid = 123;
		let match = oldItems.find(({ _id }) => _id === newid);
		if (match) {
			alert('You can select exclusive product once!');
		} else {
			let newItem = {
				image: 'harrier.jpg',
				_id: 123,
				title: 'Harrier',
				price: '1203241',
				description:
					'Aperiam exercitationem et unde sed. Nihil quia et. Officia voluptatum earum distinctio illum blanditiis consequuntur. Et sint et reiciendis in pariatur.',
				quantity: parseInt(this.state.quantity),
				total: 1203241 * parseInt(this.state.quantity)
			};
			oldItems.push(newItem);
		}
		localStorage.setItem('Cart', JSON.stringify(oldItems));
	}

	addToCart = (item) => {
		let oldItems = JSON.parse(localStorage.getItem('Cart')) || [];
		let newid = item._id;
		console.log(newid);
		let match = oldItems.find(({ _id }) => _id === newid);
		if (match) {
			match['quantity'] += parseInt(this.state.quantity);
			match['total'] += item.price * parseInt(this.state.quantity);
		} else {
			let newItem = {
				image: item.image,
				_id: item._id,
				title: item.title,
				price: item.price,
				description: item.description,
				quantity: parseInt(this.state.quantity),
				total: item.price * parseInt(this.state.quantity)
			};
			oldItems.push(newItem);
		}
		localStorage.setItem('Cart', JSON.stringify(oldItems));
	};

	render() {
		const harrierRow = {
			position: 'relative'
		};

		const carouselStyle = {
			height: '600px'
		};

		const carousel = {
			marginBottom: '20px'
		};

		const style = {
			marginTop: '70px',
			marginBottom: '70px',
			height: 'auto'
		};

		return (
			<Fragment>
				<div style={style}>
					<meta charSet='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
					<Carousel style={carousel}>
						<Carousel.Item style={carouselStyle}>
							<img className='carouselImage d-block w-100' src={Image1} alt='First slide' />
							<Carousel.Caption>
								<h3>CSV</h3>
								<p>We provide any asistance</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item style={carouselStyle}>
							<img className='carouselImage d-block w-100' src={Image2} alt='Third slide' />
							<Carousel.Caption>
								<h3>x3dv</h3>
								<p>We are helping humanity to the better future</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item style={carouselStyle}>
							<img className='carouselImage d-block w-100' src={Image3} alt='Third slide' />
							<Carousel.Caption>
								<h3>Join Us</h3>
								<p>
									<Link to='/register' className='kryptonite-button btn btn-success'>
										Register Now!
									</Link>
								</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
					{/* Page Content */}
					<div className='container-fluid col-md-8'>
						<div className='row'>
							{/* /.col-lg-3 */}

							{/* RECENTLY ADDED PRODUCT */}
							<div className='col-lg-12'>
								<div className=' text-center text-primary' style={{ marginBottom: '20px', marginTop: '50px' }}>
									<h4 className='kryptonite-navbar-icon kryptonite-text text-primary'>blogs</h4>
								</div>
								<hr className='bg-primary' />
								<div className='row'>
									<div className='col-lg-4 ' style={{ marginBottom: '50px' }}>
										<div className='card h-100  border border-primary'>
											<div>
												<img className='card-img-top' src={Image4} alt='Harrier' />
											</div>
											<div className='card-body'>
												<h4 className='card-title text-center'>
													<p className='text-primary'>How to push up like an russian?</p>
												</h4>
												<h5 className='text-primary'>By: Johnpaul Weissnat</h5>
												<p className='card-text text-primary'>Maiores magni doloribus similique quos reiciendis qui aut.</p>
											</div>
										</div>
									</div>
									<div className='col-lg-4 ' style={{ marginBottom: '50px' }}>
										<div className='card h-100  border border-primary'>
											<div>
												<img className='card-img-top' src={Image5} alt='Harrier' />
											</div>
											<div className='card-body'>
												<h4 className='card-title text-center'>
													<p className='text-primary'>Being spec-ops in antartica</p>
												</h4>
												<h5 className='text-primary'>By: Cpt.O'Conner</h5>
												<p className='card-text text-primary'>Totam sunt dolorem repudiandae incidunt vitae aut.</p>
											</div>
										</div>
									</div>
									<div className='col-lg-4 ' style={{ marginBottom: '50px' }}>
										<div className='card h-100  border border-primary'>
											<div>
												<img className='card-img-top' src={Image6} alt='Harrier' />
											</div>
											<div className='card-body'>
												<h4 className='card-title text-center'>
													<p className='text-primary'>How to shoot properly</p>
												</h4>
												<h5 className='text-primary'>By: Eudora Carroll</h5>
												<p className='card-text text-primary'>
													Maxime corrupti non voluptatem aspernatur aliquid repudiandae nam. Suscipit repellendus sit qui et sed
													tenetur.
												</p>
											</div>
										</div>
									</div>
								</div>
								{/* EXCLUSIVE PRODUCTS */}
								<div className=' text-center text-warning' style={{ marginBottom: '20px', marginTop: '20px' }}>
									<h4 className='kryptonite-navbar-icon kryptonite-text text-warning'>exclusive product</h4>
								</div>
								<hr className='bg-warning' />
								<div className='row' style={harrierRow}>
									<div className='col-lg-12 ' style={{ marginBottom: '50px' }}>
										<div className='card h-100  border border-warning'>
											<div>
												<img style={{ height: '480px' }} className='card-img-top' src={Harrier} alt='Harrier' />
											</div>
											<div className='card-body'>
												<h4 className='card-title text-center'>
													<p className='text-warning'>Harrier</p>
												</h4>
												<h5 className='text-warning'>Price: $1203241</h5>
												<p className='card-text text-warning'>
													Aperiam exercitationem et unde sed. Nihil quia et. Officia voluptatum earum distinctio illum blanditiis
													consequuntur. Et sint et reiciendis in pariatur.
												</p>
											</div>
											<button
												onClick={this.addExclusiveProductToCart}
												className='card-footer border border-warning d-flex justify-content-around text-warning'
											>
												ORDER NOW
											</button>
										</div>
									</div>
								</div>
								<div className=' text-center text-warning' style={{ marginBottom: '20px' }}>
									<h4 className='kryptonite-navbar-icon kryptonite-text text-danger'>other products</h4>
								</div>
								<hr className='bg-danger' />
								<div className='row'>
									{this.state.product.map((res) => {
										return (
											<div className='col-lg-3 col-md-6 mb-4' key={res._id}>
												<div className='card h-100'>
													<div>
														<img
															onClick={() => {
																this.handleModalClose(res);
															}}
															className='card-img-top'
															src={`${process.env.PUBLIC_URL}/uploads/products/${res.image}`}
															alt={res.title + 'Product'}
														/>
													</div>
													<div className='card-body'>
														<h4 className='card-title text-center'>
															<p>{res.title}</p>
														</h4>
														<h5>Price: ${res.price}</h5>
														<p className='card-text'>{res.description}</p>
													</div>
													{this.isUser(res)}
													<div className='card-footer d-flex justify-content-around'>
														<small className='text-muted'>
															{res.quantity > 0 ? (
																<span> Remaining Quantity: {res.quantity}</span>
															) : (
																<span className='text-center text-danger'>Out Of Stock</span>
															)}
														</small>
													</div>
												</div>
												<ProductDescription
													deleteProduct={this.deleteProduct}
													modalStatus={this.state.modalStatus}
													handleModalClose={this.handleModalClose}
													data={this.state.sendedData}
												/>
											</div>
										);
									})}
								</div>
								<h4 className='kryptonite-navbar-icon kryptonite-text text-center'>our location</h4>
								<hr className='bg-dark' />

								{/* /.row */}
							</div>
							{/* /.col-lg-9 */}
						</div>
						{/* /.row */}
						<iframe
							title='awodko'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112834.69170986276!2d112.69004258744648!3d-7.252724830005846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9436fe7a667%3A0x4f369e9de95f773c!2sHell!5e0!3m2!1sid!2sid!4v1583294351631!5m2!1sid!2sid'
							width={1240}
							height={450}
							frameBorder={0}
							style={{ border: 0 }}
							allowFullScreen
						/>
					</div>
				</div>
				<Footer />
			</Fragment>
		);
	}
}

export default Index;
