import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormData = this.handleFormData.bind(this);
  }
  handleFormData = e => {
    e.preventDefault();
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;
    axios
      .post("http://localhost:2020/login", {
        username,
        password
      })
      .then(res => {
        if (res.data) {
          let _id = res.data._id;
          let token = res.data._id;
          let role = res.data.role;
          let address = res.data.address;
          let image = res.data.image
          if(image){
            console.log("Profile Status Active!")
            image = res.data.image
            const JSONImage = JSON.stringify(image)
            localStorage.setItem("Image", JSONImage)
          } else {
            console.log("Profile Status Disabled!")
          }
          console.log(token);
          let JSON_id = JSON.stringify(_id);
          let JSONToken = JSON.stringify(token);
          let JSONRole = JSON.stringify(role);
          localStorage.setItem("_id", JSON_id);
          localStorage.setItem("Token", JSONToken);
          localStorage.setItem("Role", JSONRole);
          if (address) {
            let JSONAddress = JSON.stringify(address);
            localStorage.setItem("Address", JSONAddress);
          }
          window.location.assign("/");
        } else {
          window.location.assign("/login");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <Fragment>
        <div className="container col col-md-4" style={{ marginTop: "140px" }}>
          {/* Default form login */}
          <form
            onSubmit={this.handleFormData}
            className="text-center border border-light p-5"
            action="#!"
          >
            <p className="h4 mb-4">Sign in</p>
            {/* Email */}
            <input
              type="text"
              name="username"
              className="form-control mb-4"
              placeholder="Username"
            />
            {/* Password */}
            <input
              type="password"
              name="password"
              className="form-control mb-4"
              placeholder="Password"
            />
            <div className="d-flex justify-content-around">
              <div>
                {/* Remember me */}
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="defaultLoginFormRemember"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="defaultLoginFormRemember"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div>
                {/* Forgot password */}
                <Link to="/login">Forgot Password?</Link>
              </div>
            </div>
            {/* Sign in button */}
            <button className="btn btn-info btn-block my-4" type="submit">
              Sign in
            </button>
            {/* Register */}
            <p className="kryptonite-text">
              Not a member?
              <Link to="/register"> Register</Link>
            </p>
            {/* Social login */}
            <p className="kryptonite-text">or sign in with:</p>
            <a href="/" className="mx-2" role="button">
              <i className="fab fa-facebook-f light-blue-text" />
            </a>
            <a href="/" className="mx-2" role="button">
              <i className="fab fa-twitter light-blue-text" />
            </a>
            <a href="/" className="mx-2" role="button">
              <i className="fab fa-linkedin-in light-blue-text" />
            </a>
            <a href="/" className="mx-2" role="button">
              <i className="fab fa-github light-blue-text" />
            </a>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default Login;
