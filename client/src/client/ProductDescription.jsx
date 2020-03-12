import React, { Fragment, Component } from "react";
import Modal from "react-modal";
import EditProduct from "./EditProduct";
import { Link } from "react-router-dom";
Modal.setAppElement("#root");

//
// ─── ALERT! PROPS CONTAIN PRODUCT ID ────────────────────────────────────────────
//

export default class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
    this.handleProductId = this.handleProductId.bind(this);
    this.handleEditModal = this.handleEditModal.bind(this);
    this.state = {
      cart: [],
      dataProps: [],
      _id: "",
      quantity: 1,
      total: 0,
      editModalStatus: false
    };
  }

  componentDidMount() {
    this.handleProductId();
  }

  handleEditModal() {
    this.setState(() => ({ editModalStatus: !this.state.editModalStatus }));
  }

  handleProductId() {
    this.setState(() => ({ _id: this.props.data._id }));
  }

  addToCart = item => {
    let oldItems = JSON.parse(localStorage.getItem("Cart")) || [];
    let newid = item._id;
    console.log(newid);
    let match = oldItems.find(({ _id }) => _id === newid);
    if (match) {
      match["quantity"] += parseInt(this.state.quantity);
      match["total"] += item.price * parseInt(this.state.quantity);
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
    localStorage.setItem("Cart", JSON.stringify(oldItems));
  };

  isAdmin() {
    let role = localStorage.getItem("Role");
    if (role) {
      let JSONRole = JSON.parse(localStorage.getItem("Role"));
      if (JSONRole === "Admin") {
        return (
          <Fragment>
            <span>
              <form
                onSubmit={() => this.props.deleteProduct(this.props.data._id)}
              >
                <button className="btn btn-outline-danger" type="submit">
                  Delete
                </button>
              </form>
            </span>
            <button
              className="btn btn-outline-primary"
              onClick={this.handleEditModal}
            >
              Edit
            </button>
          </Fragment>
        );
      } else {
        return (
          <button
            onClick={() => {
              this.addToCart(this.props.data);
            }}
            className="btn btn-outline-success"
          >
            Add To Cart
          </button>
        );
      }
    } else {
      return (
            <Link to="/login" className="btn btn-outline-success">
              Login Now
            </Link>
      );
    }
  }

  notLoggedIn(){
    let token = localStorage.getItem('Token')
    let _id = localStorage.getItem('_id')
    if(!token && !_id){
      return (
        <p className="kryptonite-text text-center">You must Login First!</p>
      )
    }
  }

  render() {
    const customStyles = {
      content: {
        width: "800px",
        height: "auto",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
      }
    };

    const imageStyles = {
      width: "300px",
      height: "220px",
      marginLeft: "230px"
    };
    return (
      <Modal
        isOpen={this.props.modalStatus}
        contentLabel="Product Description"
        onRequestClose={this.props.handleModalClose}
        style={customStyles}
      >
        <Fragment>
          {this.notLoggedIn()}
          <div className="fixmodal card text-center">
            <img
              style={imageStyles}
              className="card-img-top"
              src={`${process.env.PUBLIC_URL}/uploads/products/${this.props.data.image}`}
              alt={this.props.title + " Product"}
            />
            <div className="card-body">
              <h4 className="card-title">{this.props.data.title}</h4>
              <div className="col-col-md-12 d-flex justify-content-center">
                <div className="row">
                  <div className="col col-md-12">
                    {this.props.data.description}
                  </div>
                </div>
                <div className="col">
                  Quantity: {this.props.data.quantity}pcs
                </div>
                <div className="col">Price: ${this.props.data.price}</div>
                <button
                  onClick={this.props.handleModalClose}
                  className="btn btn-outline-warning"
                >
                  Close
                </button>
                {this.isAdmin()}
              </div>
            </div>
            <EditProduct
              title={this.props.data.title}
              price={this.props.data.price}
              description={this.props.data.description}
              quantity={this.props.data.quantity}
              _id={this.props.data._id}
              image={this.props.data.image}
              handleEditModal={this.handleEditModal}
              editModalStatus={this.state.editModalStatus}
            />
          </div>
        </Fragment>
      </Modal>
    );
  }
}
