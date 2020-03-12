import React, { Component, Fragment } from "react";
import axios from "axios";
import Modal from "react-modal";
class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.previousValue = this.previousValue.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFormData = this.handleFormData.bind(this);
    this.state = {
      title: "",
      price: 0,
      quantity: 0,
      description: "",
      image: "Public.png"
    };
  }

  previousValue() {
    this.setState(() => ({
      title: this.props.title,
      price: this.props.price,
      quantity: this.props.quantity,
      description: this.props.description,
      image: this.props.image
    }));
  }

  componentDidMount() {
    this.previousValue();
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFormData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("price", this.state.price);
    formData.append("quantity", this.state.quantity);
    formData.append("description", this.state.description);
    formData.append("image", this.state.image);
    const config = { headers: { "content-type": "multipart/form-data" } };
    axios
      .put(
        "http://localhost:2020/product/edit/" + this.props._id,
        formData,
        config
      )
      .then(res => {
        console.log(res);
        window.location.assign("/");
      })
      .catch(err => {
        console.log(err);
      });
    console.log(formData)
  }
  render() {
    return (
      <Modal
        isOpen={this.props.editModalStatus}
        contentLabel="Edit Product"
        onRequestClose={this.props.handleEditModal}
      >
        <Fragment>
          <form onSubmit={this.handleFormData}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title</label>
              <input
                type="text"
                onChange={this.onChange}
                value={this.state.title}
                name="title"
                className="form-control"
                placeholder="Enter title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Price</label>
              <input
                type="number"
                onChange={this.onChange}
                value={this.state.price}
                name="price"
                className="form-control"
                placeholder="Enter price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Quantity</label>
              <input
                type="number"
                onChange={this.onChange}
                value={this.state.quantity}
                name="quantity"
                className="form-control"
                placeholder="Enter quantity"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Description</label>
              <input
                type="text"
                onChange={this.onChange}
                value={this.state.description}
                name="description"
                className="form-control"
                placeholder="Enter description"
              />
            </div>
            <div className="form-group bg-primary">
              <label>Upload Files</label>
              <input
                type="file"
                onChange={this.onFileChange}
                name="image"
                className="form-control"
                placeholder="Upload File"
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-success">
              Submit
            </button>
            <button
              onClick={this.props.handleEditModal}
              className="btn btn-outline-warning"
            >
              Close
            </button>
          </form>
        </Fragment>
      </Modal>
    );
  }
}

export default EditProduct;
