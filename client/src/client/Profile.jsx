import React, { Component, Fragment } from "react";
import axios from "axios";
export default class Profile extends Component {
  constructor() {
    super();
    this.handlePreviousData = this.handlePreviousData.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFormData = this.handleFormData.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.state = {
      user: [],
      modalOpen: false,
      // ─────────────────────────────────────────────────────────────────
      _id: "",
      // ─────────────────────────────────────────────────────────────────
      firstName: "",
      lastName: "",
      email: "",
      address2: "",
      country: "",
      zip: 0,
      // ─────────────────────────────────────────────────────────────────
      description: "",
      age: 0,
      address: "",
      image: null
    };
  }
  // ────────────────────────────────────────────────────────────────────────────────
  componentDidMount() {
    this.getUserProfile();
    this.handleIdChange();
    this.handlePreviousData();
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

  handlePreviousData() {
    const _id = JSON.parse(localStorage.getItem("_id"));
    axios.get("http://localhost:2020/profile/" + _id).then(res => {
      this.setState({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        country: res.data.country,
        zip: res.data.zip,
        description: res.data.description,
        age: res.data.age,
        address: res.data.address,
        address2: res.data.address2,
        image: res.data.image
      });
    });
  }

  handleFormData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("email", this.state.email);
    formData.append("address2", this.state.address2);
    formData.append("country", this.state.country);
    formData.append("zip", this.state.zip);
    // ─────────────────────────────────────────────────────────────────
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
        let image = JSON.stringify(this.state.image);
        localStorage.setItem("Image", image);
        window.location.assign("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  // ────────────────────────────────────────────────────────────────────────────────

  handleModalClose() {
    this.setState(() => ({ modalOpen: !this.state.modalOpen }));
  }

  getUserProfile() {
    const id = JSON.parse(localStorage.getItem("_id"));
    axios.get("http://localhost:2020/profile/" + id).then(res => {
      this.setState({ user: res.data });
    });
  }

  render() {
    const style = {
      marginTop: "100px"
    };
    return (
      <Fragment>
        <div style={style} className="container">
          <div className="row my-2">
            <div className="col-lg-8 order-lg-2">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <span
                    data-target="#profile"
                    data-toggle="tab"
                    className="kryptonite-text nav-link active"
                  >
                    Profile
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    data-target="#edit"
                    data-toggle="tab"
                    className="kryptonite-text nav-link"
                  >
                    Edit
                  </span>
                </li>
              </ul>
              <div className="tab-content py-4">
                <div className="tab-pane active" id="profile">
                  <h5 className="kryptonite-text mb-3">
                    {this.state.user.firstName} {this.state.user.lastName} aka{" "}
                    {this.state.user.username}
                  </h5>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="kryptonite-text">About</h6>
                      <p className="kryptonite-text">
                        {this.state.user.description}
                      </p>

                      <h6 className="kryptonite-text">Informations</h6>
                      <p className="kryptonite-text">
                        Age: {this.state.user.age}
                      </p>
                      <p className="kryptonite-text">
                        Zip: {this.state.user.zip}
                      </p>
                      <p className="kryptonite-text">
                        Email: {this.state.user.email}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="kryptonite-text">Recent badges</h6>
                      {this.state.user.role === "Admin" ? (
                        <a
                          href="/profile"
                          className="badge badge-danger badge-pill"
                        >
                          {this.state.user.role}
                        </a>
                      ) : (
                        <a
                          href="/profile"
                          className="badge badge-dark badge-pill"
                        >
                          {this.state.user.role}
                        </a>
                      )}

                      <hr className="bg-dark" />
                      <span className="badge badge-primary">
                        <i className="kryptonite-tefa fa-user" /> 900 Followers
                      </span>
                      <span className="badge badge-success">
                        <i className="kryptonite-tefa fa-cog" /> 43 Forks
                      </span>
                      <span className="badge badge-danger">
                        <i className="kryptonite-tefa fa-eye" /> 245 Views
                      </span>
                    </div>
                  </div>
                  {/*/row*/}
                </div>
                <div className="tab-pane" id="messages">
                  <div className="kryptonite-text alert alert-info alert-dismissable">
                    <span
                      className="kryptonite-text panel-close close"
                      data-dismiss="alert"
                    >
                      ×
                    </span>
                    You have
                    <strong className="kryptonite-text"> 0</strong> saved carts
                    in your transaction list
                  </div>
                  <table className="table table-hover table-striped">
                    <tbody>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            3 hrs ago
                          </span>{" "}
                          Here is your a link to the latest summary report from
                          the..
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            Yesterday
                          </span>{" "}
                          There has been a request on your account since that
                          was..
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            9/10
                          </span>{" "}
                          Porttitor vitae ultrices quis, dapibus id dolor. Morbi
                          venenatis lacinia rhoncus.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            9/4
                          </span>{" "}
                          Vestibulum tincidunt ullamcorper eros eget luctus.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="float-right font-weight-bold">
                            9/4
                          </span>{" "}
                          Maxamillion ais the fix for tibulum tincidunt
                          ullamcorper eros.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane" id="edit">
                  <form
                    onSubmit={this.handleFormData}
                    className="form-horizontal"
                  >
                    <div style={style} className="container">
                      <h1 className="kryptonite-text">Edit Profile</h1>
                      <hr />
                      <div className="row">
                        {/* left column */}
                        <div className="col-md-3">
                          <div className="text-center">
                            <img
                              src={`${process.env.PUBLIC_URL}/uploads/users/${this.state.image}`}
                              className="avatar img-circle"
                              alt="avatar"
                            />
                            <h6 className="kryptonite-text">
                              Upload a different photo...
                            </h6>
                            <input
                              type="file"
                              className="form-control"
                              onChange={this.onFileChange}
                              name="image"
                              required
                            />
                          </div>
                        </div>
                        {/* edit form column */}
                        <div className="col-md-9 personal-info">
                          <h3 className="kryptonite-text">Personal info</h3>

                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              First name:
                            </label>
                            <div className="col-lg-8">
                              <input
                                className="form-control"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.onChange}
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Last name:
                            </label>
                            <div className="col-lg-8">
                              <input
                                className="form-control"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.onChange}
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Email:
                            </label>
                            <div className="col-lg-8">
                              <input
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                type="email"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Address:
                            </label>
                            <div className="col-lg-8">
                              <input
                                className="form-control"
                                name="address"
                                value={this.state.address}
                                onChange={this.onChange}
                                type="text"
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Current Location:
                            </label>
                            <div className="col-lg-8">
                              <input
                                className="form-control"
                                name="address2"
                                value={this.state.address2}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Apartement"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Country:
                            </label>
                            <div className="col-lg-8">
                              <input
                                className="form-control"
                                name="country"
                                value={this.state.country}
                                onChange={this.onChange}
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Zip:
                            </label>
                            <div className="col-lg-8">
                              <input
                                className="form-control"
                                name="zip"
                                value={this.state.zip}
                                onChange={this.onChange}
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Bio:
                            </label>
                            <div className="col-lg-8">
                              <textarea
                                className="form-control"
                                name="description"
                                onChange={this.onChange}
                                value={this.state.description}
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Age:
                            </label>
                            <div className="col-lg-8">
                              <input
                                className="form-control"
                                name="age"
                                onChange={this.onChange}
                                value={this.state.age}
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-md-3 control-label" />
                            <div className="col-md-8">
                              <input
                                type="submit"
                                className="kryptonite-button btn btn-primary"
                                defaultValue="Save Changes"
                              />
                              <span />
                              <input
                                onClick={() =>
                                  window.location.assign("/profile")
                                }
                                type="reset"
                                className="kryptonite-button btn btn-outline-default"
                                defaultValue="Cancel"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <hr />
                </div>
              </div>
            </div>
            <div
              style={{ height: "300px" }}
              className="col-lg-4 order-lg-1 text-center"
            >
              <img
                style={{ height: "300px" }}
                src={`${process.env.PUBLIC_URL}/uploads/users/${this.state.user.image}`}
                className="mx-auto img-fluid img-circle d-block"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
