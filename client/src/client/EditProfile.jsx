import React, { Component, Fragment } from "react";
import axios from "axios";
import Modal from "react-modal";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.handlePreviousData = this.handlePreviousData.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFormData = this.handleFormData.bind(this);
    this.state = {
      _id: "",
      description: "",
      age: 0,
      address: "",
      image: null
    };
  }

  componentDidMount() {
    this.handleIdChange();
    this.handlePreviousData()
  }

  handleIdChange() {
    const _id = JSON.parse(localStorage.getItem("_id"));
    if (!_id) {
      alert("System Bypassed!");
      window.location.assign("/");
    } else {
      this.setState(() => ({ _id }));
    }
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handlePreviousData () {
      const _id = JSON.parse(localStorage.getItem("_id"))
      axios.get('http://localhost:2020/profile/' + _id).then(res => {this.setState({
          description: res.data.description,
          age: res.data.age,
          address: res.data.address
      })})
  }

  handleFormData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", this.state.description);
    formData.append("age", this.state.age);
    formData.append("address", this.state.address);
    formData.append("image", this.state.image);
    const config = { headers: { "content-type": "multipart/form-data" } };
    axios
      .put("http://localhost:2020/profile/" + this.state._id, formData, config)
      .then(res => {
        let address = JSON.stringify(this.state.address);
        localStorage.setItem("Address", address);
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
      <Modal  isOpen={this.props.modalOpen} contentLabel="Edit Profile">
        <Fragment>
          <form style={style} className="form form-vertical" onSubmit={this.handleFormData}>
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
          <button className="btn btn-outline-primary" onClick={this.props.handleModalClose}>Close</button>
        </Fragment>
      </Modal>
    );
  }
}
