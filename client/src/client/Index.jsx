import React, { Component, Fragment } from "react";
import axios from "axios";
import Image1 from "../res/images/deepsea.jpg";
import Image2 from "../res/images/corp.jpg";
import Image3 from "../res/images/Witching Hour.jpg";
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
      modalStatus: false
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

    const cardImage = {
      height: "200px",
      width: "300px",
      marginLeft: "25px"
    };

    return (
      <Fragment>
        <div style={style}>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          {/* Page Content */}
          <div className="container">
            <div className="row">
              {/* /.col-lg-3 */}
              <div className="col-lg-12">
                <Carousel style={carousel}>
                  <Carousel.Item style={carouselStyle}>
                    <img
                      className="carouselImage d-block w-100"
                      src={Image1}
                      alt="First slide"
                      // style={carouselImage}
                    />
                    <Carousel.Caption>
                      <h3>Beneath The Sea</h3>
                      <p>Many unknown creature are aside from us</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={carouselStyle}>
                    <img
                      className="carouselImage d-block w-100"
                      src={Image2}
                      alt="Third slide"
                      // style={carouselImage}
                    />
                    <Carousel.Caption>
                      <h3>Kryptonite Corporation</h3>
                      <p>We are helping humanity to the better future</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={carouselStyle}>
                    <img
                      className="carouselImage d-block w-100"
                      src={Image3}
                      alt="Third slide"
                      // style={carouselImage}
                    />

                    <Carousel.Caption>
                      <h3>Join Us</h3>
                      <p>
                        <Link
                          to="/register"
                          className="kryptonite-button btn btn-success"
                        >
                          Register Now!
                        </Link>
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
                <div className="row">
                  {this.state.product.map(res => {
                    return (
                      <div className="col-lg-4 col-md-6 mb-4" key={res._id}>
                        <div className="card h-100">
                          <div>
                            <img
                              style={cardImage}
                              onClick={() => {
                                this.handleModalClose(res);
                              }}
                              className="card-img-top"
                              src={`${process.env.PUBLIC_URL}/uploads/products/${res.image}`}
                              alt={res.title + "Product"}
                            />
                          </div>
                          <div className="card-body">
                            <h4 className="card-title text-center">
                              <p>{res.title}</p>
                            </h4>
                            <h5>Price: ${res.price}</h5>
                            <p className="card-text">{res.description}</p>
                          </div>
                          {this.isUser(res)}
                          <div className="card-footer d-flex justify-content-around">
                            <small className="text-muted">
                              Remaining Quantity: {res.quantity}
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
                <h4 className="kryptonite-text text-center">Our Location</h4>
                <iframe
                  title="awodko"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112834.69170986276!2d112.69004258744648!3d-7.252724830005846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9436fe7a667%3A0x4f369e9de95f773c!2sHell!5e0!3m2!1sid!2sid!4v1583294351631!5m2!1sid!2sid"
                  width={1100}
                  height={450}
                  frameBorder={0}
                  style={{ border: 0 }}
                  allowFullScreen
                />
                {/* /.row */}
              </div>
              {/* /.col-lg-9 */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container */}
          {/* Footer */}
          {/* Bootstrap core JavaScript */}
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Index;
