import React, { Component, Fragment } from "react";
import axios from "axios";
import Image1 from "../res/images/shoot out.gif";
import Image2 from "../res/images/f.gif";
import Image3 from "../res/images/stars.gif";
import Carousel from "react-bootstrap/Carousel";
import ProductDescription from "./ProductDescription";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
class Index extends Component {
  constructor(props) {
    super(props);
    this.isUser = this.isUser.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
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
    axios.get("http://localhost:2020/product").then(res => {
      this.setState({ product: res.data });
    });
  }

  isUser(res) {
    let userRole = localStorage.getItem("Role");
    if (userRole) {
      let JSONUserRole = JSON.parse(userRole);
      if (JSONUserRole === "User") {
        return (
          <button
            onClick={() => this.addToCart(res)}
            className="kryptonite-button btn btn-outline-success"
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
      .delete("http://localhost:2020/product/" + productId)
      .then(res => {
        window.location.assign("/");
      })
      .catch(err => console.log(err));
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

  render() {
    const carouselStyle = {
      height: "400px"
    };

    const carousel = {
      marginBottom: "20px"
    };

    const style = {
      marginTop: "90px",
      marginBottom: "70px",
      height: "auto"
    };

    return (
      <Fragment>
        <meta charSet="utf-8" />
        <meta httpEquiv="pragma" content="no-cache" />
        <meta httpEquiv="cache-control" content="max-age=604800" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Website title - bootstrap html template</title>
        <link
          href="images/favicon.ico"
          rel="shortcut icon"
          type="image/x-icon"
        />
        {/* jQuery */}
        {/* Bootstrap4 files*/}
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        {/* Font awesome 5 */}
        <link
          href="fonts/fontawesome/css/all.min.css"
          type="text/css"
          rel="stylesheet"
        />
        {/* custom style */}
        <link href="css/ui.css" rel="stylesheet" type="text/css" />
        <link
          href="css/responsive.css"
          rel="stylesheet"
          media="only screen and (max-width: 1200px)"
        />
        {/* section-header.// */}
        {/* ========================= SECTION INTRO ========================= */}
        <section className="section-intro">
          <div
            style={{ marginTop: "100px", height: "920px" }}
            className="intro-banner-wrap"
          >
            <img src={Image1} className="w-100 h-50 img-fluid" />
          </div>
        </section>
        {/* ========================= SECTION INTRO END// ========================= */}
        {/* ========================= SECTION SPECIAL ========================= */}
        <section className="section-specials padding-y border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <figure className="itemside">
                  <div className="aside">
                    <span className="icon-sm rounded-circle bg-primary">
                      <i className="fa fa-money-bill-alt white" />
                    </span>
                  </div>
                  <figcaption className="info">
                    <h6 className="title">Reasonable prices</h6>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labor{" "}
                    </p>
                  </figcaption>
                </figure>{" "}
                {/* iconbox // */}
              </div>
              {/* col // */}
              <div className="col-md-4">
                <figure className="itemside">
                  <div className="aside">
                    <span className="icon-sm rounded-circle bg-danger">
                      <i className="fa fa-comment-dots white" />
                    </span>
                  </div>
                  <figcaption className="info">
                    <h6 className="title">Customer support 24/7 </h6>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labor{" "}
                    </p>
                  </figcaption>
                </figure>{" "}
                {/* iconbox // */}
              </div>
              {/* col // */}
              <div className="col-md-4">
                <figure className="itemside">
                  <div className="aside">
                    <span className="icon-sm rounded-circle bg-success">
                      <i className="fa fa-truck white" />
                    </span>
                  </div>
                  <figcaption className="info">
                    <h6 className="title">Quick delivery</h6>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labor{" "}
                    </p>
                  </figcaption>
                </figure>{" "}
                {/* iconbox // */}
              </div>
              {/* col // */}
            </div>{" "}
            {/* row.// */}
          </div>{" "}
          {/* container.// */}
        </section>
        {/* ========================= SECTION SPECIAL END// ========================= */}
        {/* ========================= SECTION  ========================= */}
        <section className="section-name  padding-y-sm">
          <div className="container">
            <header className="section-heading">
              <a href="#" className="btn btn-outline-primary float-right">
                See all
              </a>
              <h3 className="section-title">Popular products</h3>
            </header>
            {/* sect-heading */}
            <div className="row">
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src="images/items/1.jpg" />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      Just another product name
                    </a>
                    <div className="price mt-1">$179.00</div>{" "}
                    {/* price-wrap.// */}
                  </figcaption>
                </div>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src="images/items/2.jpg" />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      Some item name here
                    </a>
                    <div className="price mt-1">$280.00</div>{" "}
                    {/* price-wrap.// */}
                  </figcaption>
                </div>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src="images/items/3.jpg" />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      Great product name here
                    </a>
                    <div className="price mt-1">$56.00</div>{" "}
                    {/* price-wrap.// */}
                  </figcaption>
                </div>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src="images/items/4.jpg" />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      Just another product name
                    </a>
                    <div className="price mt-1">$179.00</div>{" "}
                    {/* price-wrap.// */}
                  </figcaption>
                </div>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src="images/items/5.jpg" />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      Just another product name
                    </a>
                    <div className="price mt-1">$179.00</div>{" "}
                    {/* price-wrap.// */}
                  </figcaption>
                </div>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src="images/items/6.jpg" />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      Some item name here
                    </a>
                    <div className="price mt-1">$280.00</div>{" "}
                    {/* price-wrap.// */}
                  </figcaption>
                </div>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src="images/items/7.jpg" />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      Great product name here
                    </a>
                    <div className="price mt-1">$56.00</div>{" "}
                    {/* price-wrap.// */}
                  </figcaption>
                </div>
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3">
                <div href="#" className="card card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src="images/items/9.jpg" />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      Just another product name
                    </a>
                    <div className="price mt-1">$179.00</div>{" "}
                    {/* price-wrap.// */}
                  </figcaption>
                </div>
              </div>{" "}
              {/* col.// */}
            </div>{" "}
            {/* row.// */}
          </div>
          {/* container // */}
        </section>
        <Footer />
        <td>
          <Link to="/" className="kryptonite-button btn btn-outline-primary">
            <i className="fa fa-angle-left" /> Continue Shopping
          </Link>
        </td>
        <td colSpan={2} className="hidden-xs" />
        <td className="kryptonite-text hidden-xs text-center">
          {/* <form onSubmit={this.handleInitiateData}>
                      <button
                        disabled={!localStorage.getItem("Cart")}
                        className="kryptonite-button btn btn-outline-warning"
                      >
                        Save Current Data
                      </button>
                    </form> */}
        </td>

        <td>
          <Link
            disabled={!localStorage.getItem("Cart")}
            className="kryptonite-button btn btn-outline-success"
            to="/checkout"
          >
            CHECKOUT <i className="fa fa-angle-right" />
          </Link>
        </td>
        // • • • • •
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
<h3 className="kryptonite-text text-center"></h3>
          <form
            style={style}
            className="form form-vertical"
            onSubmit={this.handleFormData}
          >
            <div className="row">
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <input
                        className="custom-file-input"
                        onChange={this.onFileChange}
                        id="customFile"
                        name="image"
                        type="file"
                        required
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Your Profile Image
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        onChange={this.onChange}
                        value={this.state.address}
                        className="form-control"
                        name="address"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="pwd">Age</label>
                      <input
                        type="number"
                        onChange={this.onChange}
                        value={this.state.age}
                        className="form-control"
                        name="age"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Tell us about yourself</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.description}
                        name="description"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <hr />
                  <div className="text-right">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <button
            className="btn btn-outline-primary"
            onClick={this.props.handleModalClose}
          >
            Close
          </button>
      </Fragment>
    );
  }
}

export default Index;
