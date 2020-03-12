import React, { Component, Fragment } from "react";
import axios from "axios";
import ProofPayment from "./ProofPayment";
export default class TransactionList extends Component {
  constructor() {
    super();
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      status: false,
      transactions: []
    };
  }

  componentDidMount() {
    this.handleGetTransactions();
  }

  handleGetTransactions() {
    let _id = localStorage.getItem("_id");
    let token = localStorage.getItem("Token");
    if (!_id && !token) {
      alert("Please Login First!");
      window.location.assign("/login");
    } else {
      _id = JSON.parse(_id);
      token = JSON.parse(token);
      axios
        .get("http://localhost:2020/checkout/" + _id)
        .then(res => this.setState({ transactions: res.data }))
        .catch(err => console.log(err));
    }
  }

  handleDeleteTransaction(data) {
    axios
      .delete("http://localhost:2020/transaction/delete/" + data._id)
      .then(res => {
        console.log(res);
        window.location.assign("/transactionList");
      })
      .catch(err => console.log(err));
  }

  handleModal() {
    this.setState(() => ({ status: !this.state.status }));
  }

  render() {
    return (
      <Fragment>
        <h3
          style={{ marginTop: "100px" }}
          className="kryptonite-text text-center"
        >
          Transaction List
        </h3>
        <div className="row justify-content-around">
          {this.state.transactions.map(data => {
            return (
              <div className="col-lg-4 col-md-6 mb-4" key={data._id}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="card-title text-center">
                      <h6>Transaction Id</h6>
                      <p>{data._id}</p>
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-6">
                              Username: {`${data.firstName} ${data.lastName}`}
                            </div>
                            <div className="col-md-6">Email: {data.email}</div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-12">
                              Address: {`${data.address},${data.country}`}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <hr className="bg-primary" />
                          <div className="row">
                            <div className="col-md-6">
                              Payment Method: {data.paymentMethod}
                            </div>
                            <div className="col-md-6">CVV: {data.cvv}</div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <hr className="bg-danger" />
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.carts.map(data => {
                                return (
                                  <tr key={data._id}>
                                    <th className="text-secondary" scope="row">
                                      {data.title}
                                    </th>
                                    <th className="text-secondary">
                                      ${data.price}
                                    </th>
                                    <th className="text-secondary">
                                      {data.quantity}
                                    </th>
                                    <th className="text-secondary">
                                      ${data.price * data.quantity}
                                    </th>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <hr />
                          <div className="row col-md-12">
                            <h4 className="col-md-10">Total: </h4>
                            <p className="col-md-2 text-success">
                              ${data.total}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ProofPayment
                      status={this.state.status}
                      handleModal={this.handleModal}
                      transactionId={data._id}
                    />
                  </div>
                  {data.status && (
                    <div className="text-center">
                      Please Check your email for further information
                    </div>
                  )}
                  {!data.image && (
                    <button
                      onClick={this.handleModal}
                      className="kryptonite-button btn btn-outline-success btn-block"
                    >
                      Proceed to Payment
                    </button>
                  )}
                  {!data.image && (
                    <button
                      onClick={() => {
                        this.handleDeleteTransaction(data);
                      }}
                      className="kryptonite-button btn btn-outline-danger btn-block"
                    >
                      Cancel Transaction
                    </button>
                  )}

                  <div className="card-footer d-flex justify-content-around">
                    {!data.status && (
                      <h6>
                        Status:
                        <span className="text-secondary"> Pending</span>
                      </h6>
                    )}
                    {data.status === "Accepted" && (
                      <h6>
                        Status:
                        <span className="text-success"> {data.status}</span>
                      </h6>
                    )}
                    {data.status === "Declined" && (
                      <h6>
                        Status:
                        <span className="text-danger"> {data.status}</span>
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}
