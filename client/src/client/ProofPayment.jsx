import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

export default class ProofPayment extends Component {
	constructor(props) {
		super(props);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.handleFormData = this.handleFormData.bind(this);
		this.handlePreviousData = this.handlePreviousData.bind(this);
		this.state = {
			transactionId: '',
			image: 'Public.png'
		};
	}

	handlePreviousData() {
		this.setState(() => ({ transactionId: this.props.transactionId }));
	}

	handleImageChange(e) {
		this.setState({ image: e.target.files[0] });
	}

	handleFormData(e) {
		e.preventDefault();
		let formData = new FormData();
		formData.append('image', this.state.image);
		const config = { headers: { 'content-type': 'multipart/form-data' } };
		axios
			.put('http://localhost:2020/transaction/' + this.props.transactionId, formData, config)
			.then((res) => {
				console.log(res);
				window.location.assign('/transactionList');
			})
			.catch((err) => console.log(err));
	}
	render() {
		const customStyles = {
			content: {
				width: '800px',
				height: 'auto',
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				marginRight: '-50%',
				transform: 'translate(-50%, -50%)'
			}
		};
		return (
			<Modal style={customStyles} isOpen={this.props.status} contentLabel='ProofOfPayment'>
				<div className='file-upload-wrapper'>
					<h5 className='kryptonite-text text-dark text-center'>Upload Proof of Payment</h5>
					<h6 className='kryptonite-text text-dark text-center'>Please transfer to the account below</h6>
					<p className='kryptonite-text text-dark text-center'>4111 1111 1111 1111</p>
					<form onSubmit={this.handleFormData}>
						<input className='file-upload col-md-12' type='file' name='image' onChange={this.handleImageChange} />
						<button type='submit' className='kryptonite-button btn btn-primary btn-block'>
							Submit
						</button>
						<div>
							<input type='checkbox' id='blankCheckbox' defaultValue='option1' aria-label='...' required />
							<label htmlFor='blankCheckbox'>Confirm Payment</label>
						</div>
					</form>
				</div>
				<button className='kryptonite-button btn btn-outline-danger ' onClick={this.props.handleModal}>
					Close
				</button>
			</Modal>
		);
	}
}
