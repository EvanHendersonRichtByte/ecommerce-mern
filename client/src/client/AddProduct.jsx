import React, { Component, Fragment } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFormData = this.handleFormData.bind(this);
    this.state = {
      title: "",
      price: 0,
      quantity: 0,
      description: "",
      image: null
    };
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
      .post("http://localhost:2020/product", formData, config)
      .then(res => {
        console.log(res)
        window.location.assign("/");
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  render() {
    const style = {
      marginTop: "100px"
    }
    return (
      <Fragment>
        <form style={style} onSubmit={this.handleFormData}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="text"
              onChange={this.onChange}
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
              name="description"
              className="form-control"
              placeholder="Enter description"
            />
          </div>
          <div className="form-group">
            <label><button className="btn btn-outline-primary">Upload Files <FontAwesomeIcon icon={faFileUpload} /></button> </label>
            <input
              type="file"
              onChange={this.onFileChange}
              name="image"
              className="form-control"
              placeholder="Upload File"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Fragment>
    );
  }
}

export default AddProduct;
