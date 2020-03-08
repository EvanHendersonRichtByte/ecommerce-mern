import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
export default class Cart extends Component {
  constructor() {
    super();
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      cart: [],
      total: 0
    };
  }

  componentDidMount() {
    this.handleGetCart();
  }

  handleGetCart() {
    let _id = localStorage.getItem("_id");
    let cart = localStorage.getItem("Cart");
    if (_id) {
      _id = JSON.parse(_id);
      axios.get("http://localhost:2020/cart/" + _id).then(res => {
        let masterData = [];
        if (cart && res.data.carts) {
          cart = JSON.parse(cart);
          masterData = cart.concat(res.data.carts);
          console.log(masterData);
        } else if (!cart) {
          masterData = res.data.carts;
        } else if (!res.data.carts) {
          masterData = JSON.parse(cart);
        }
        this.setState(() => ({ cart: masterData }));
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onQuantityChange(e) {
    let identity = e.target.value;
    this.setState(prevValue => {
      return {
        cart: (prevValue.quantity = identity)
      };
    });
    console.log(identity);
  }

  handleFormData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("price", this.state.price);
    formData.append("quantity", this.state.quantity);
    formData.append("description", this.state.description);
    formData.append("image", this.state.image);
    formData.append("subtotal", this.state.cart.total);
    const config = { headers: { "content-type": "multipart/form-data" } };
    axios
      .post("http://localhost:2020/product", formData, config)
      .then(res => {
        window.location.assign("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInitiateData(e) {
    e.preventDefault();
    const id = JSON.parse(localStorage.getItem("_id"));
    const Cart = JSON.parse(localStorage.getItem("Cart"));
    axios
      .post("http://localhost:2020/cart/" + id, {
        carts: Cart
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    localStorage.removeItem("Cart");
    window.location.assign("/");
  }

  handleDeleteItem(id) {
    let getCart = localStorage.getItem("Cart");
    let JSONCart = JSON.parse(getCart);
    let found = 0;
    let title = "";
    JSONCart.forEach(function(value, index) {
      if (value._id === id) {
        found = index;
        title = value.title;
      }
    });
    console.log(`${title} DELETED!`);
    const deletedItem = JSONCart.splice(found, 1);
    console.log(deletedItem);
  }

  render() {
    const style = {
      marginTop: "100px"
    };
    return (
      <Fragment>
        <section style={style} id="cart" className="cart">
          <div className="container">
            <table id="cart" className="table table-hover table-condensed">
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>Product</th>
                  <th style={{ width: "10%" }}>Price</th>
                  <th style={{ width: "8%" }}>Quantity</th>
                  <th style={{ width: "22%" }} className="text-center">
                    Subtotal
                  </th>
                  <th style={{ width: "10%" }} />
                </tr>
              </thead>
              <tbody>
                {this.state.cart.map(data => {
                  return (
                    <tr key={data._id}>
                      <td data-th="Product">
                        <div className="row">
                          <div className="col-sm-2 hidden-xs">
                            <img
                              src={`${process.env.PUBLIC_URL}/uploads/products/${data.image}`}
                              alt={`${data.title}'s Product gg`}
                              className="img-responsive"
                            />
                          </div>
                          <div className="col-sm-10 prod-desc">
                            <h6 className="kryptonite-text">{data.title}</h6>
                            <p className="kryptonite-text">
                              {data.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td data-th="Price">${data.price}</td>
                      <td data-th="Quantity">
                        <input
                          onChange={this.onQuantityChange}
                          type="number"
                          value={data.quantity}
                          className="form-control text-center"
                        />
                      </td>
                      <td data-th="Subtotal" className="text-center">
                        ${data.total || data.price * data.quantity}
                      </td>
                      <td className="actions" data-th>
                        <button className="btn btn-info btn-sm">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => this.handleDeleteItem(data._id)}
                          className="btn btn-danger btn-sm"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <Link
                      to="/"
                      className="kryptonite-button btn btn-outline-primary"
                    >
                      <i className="fa fa-angle-left" /> Continue Shopping
                    </Link>
                  </td>
                  <td colSpan={2} className="hidden-xs" />
                  <td className="kryptonite-text hidden-xs text-center">
                    <form onSubmit={this.handleInitiateData}>
                      <button className="kryptonite-button btn btn-outline-warning">
                        Save Current Data
                      </button>
                    </form>
                  </td>

                  <td>
                    <Link
                      className="kryptonite-button btn btn-outline-success"
                      to="/checkout"
                    >
                      CHECKOUT <i className="fa fa-angle-right" />
                    </Link>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </Fragment>
    );
  }
}
