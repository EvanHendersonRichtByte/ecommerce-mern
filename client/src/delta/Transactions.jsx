import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Transaction extends Component {
	constructor() {
		super();
		this.handleAccData = this.handleAccData.bind(this);
		this.handleDecData = this.handleDecData.bind(this);
		this.handleData = this.handleData.bind(this);
		this.state = {
			transactions: [],
			status: ''
		};
	}

	componentDidMount() {
		this.handleData();
	}

	handleData() {
		axios
			.get('http://localhost:2020/transaction')
			.then((res) => {
				console.log(res);
				this.setState(() => ({ transactions: res.data }));
			})
			.catch((err) => console.log(err));
	}

	handleAccData(data) {
		axios
			.put('http://localhost:2020/admin/checkTransaction/' + data._id, {
				status: 'Accepted'
			})
			.then((res) => window.location.assign('/dashboard'))
			.catch((err) => console.log(err));
	}

	handleDecData(data) {
		axios
			.put('http://localhost:2020/admin/checkTransaction/' + data._id, {
				status: 'Declined'
			})
			.then((res) => window.location.assign('/dashboard'))
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<Fragment>
				<main style={{ marginTop: '70px' }} role='main'>
					{/* Main jumbotron for a primary marketing message or call to action */}
					<div className='jumbotron'>
						<div className=' kryptonite-text container'>
							<h1 className=' kryptonite-text display-3'>User Transactions</h1>
							<p className='kryptonite-text'>Please confirm or decline user's transaction below!</p>
						</div>
					</div>
					<div className='container'>
						{/* Example row of columns */}
						{this.state.transactions.map((data) => (
							<div style={{ marginBottom: '40px' }} className='row' key={data._id}>
								<div className='col-md-12 border rounded border-primary'>
									<h2 className='kryptonite-text text-center'>{data.firstName + ' ' + data.lastName}</h2>
									<div className='row'>
										<div className='col-md-6'>
											<table className='table'>
												<thead>
													<tr>
														<th scope='col'>#</th>
														<th scope='col'>Title</th>
														<th scope='col'>Price</th>
														<th scope='col'>Quantity</th>
													</tr>
												</thead>
												<tbody>
													{data.carts.map((data) => (
														<tr key={data._id}>
															<th scope='row'>{data._id.substring(0, 5)}</th>
															<td>{data.title}</td>
															<td>${data.price}</td>
															<td>{data.quantity}pcs</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
										<img className='col-md-6' src={`${process.env.PUBLIC_URL}/uploads/transactions/${data.image}`} />
									</div>
									<div className='row'>
										<div className='col-md-6'>
											<div className='row'>
												<div className='col-md-3'>Total: </div>
												<div className='col-md-3'>${data.total}</div>
											</div>
										</div>
										<div className='col-md-6'>
											<p className='kryptonite-text'>Address: {data.address + ',' + data.country}</p>
											<p className='kryptonite-text'>Zip: {data.zip}</p>
											<p className='kryptonite-text'>Email: {data.email}</p>
										</div>
									</div>
									{data.status ? (
										<button disabled className='kryptonite-button btn btn-block btn-outline-secondary'>
											{data.status}
										</button>
									) : (
										<Fragment>
											<form onSubmit={() => this.handleAccData(data)}>
												<button type='submit' className='kryptonite-button btn btn-block btn-outline-success'>
													Accept
												</button>
											</form>
											<form onSubmit={() => this.handleDecData(data)}>
												<button type='submit' className='kryptonite-button btn btn-block btn-outline-danger'>
													Decline
												</button>
											</form>
										</Fragment>
									)}
								</div>
							</div>
						))}
						<hr />
					</div>
					{/* /container */}
				</main>
				{/* Bootstrap core JavaScript
    ================================================== */}
				{/* Placed at the end of the document so the pages load faster */}
			</Fragment>
		);
	}
}
