import React, { Component, Fragment } from "react";
import axios from "axios";

export default class CartHolder extends Component {
  constructor() {
    super();
    this.handleGetUserCart = this.handleGetUserCart.bind(this);
    this.state = {
      user: []
    };
  }

  componentDidMount() {
    this.handleGetUserCart();
  }

  handleGetUserCart() {
    axios
      .get("http://localhost:2020/userList")
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Fragment>
        {this.state.user.map(data => {
          return <div>{data.name}</div>;
        })}
      </Fragment>
    );
  }
}
