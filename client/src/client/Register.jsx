import React, { Fragment, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Register extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      username: "",
      password: "",
      password2: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;
    let password2 = e.target.elements.password2.value;
    if (password === password2) {
      let url = "http://localhost:2020/register";
      let form = {
        username,
        password
      };
      axios
        .post(url, form)
        .then(res => {
          console.log(res);
          window.location.assign('/login')
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("Password Must same with current definition");
    }
  };
  render() {
    return (
      <Fragment>
        <div className="container col col-md-6" style={{ marginTop: "100px" }}>
          {/* Default form register */}
          <form onSubmit={this.onSubmit} className="text-center border border-light p-5" action="#!">
            <p className="h4 mb-4">Sign up</p>
            <div className="form-row mb-4">
              <div className="col">
                {/* First name */}
                <input
                  type="text"
                  id="defaultRegisterFormFirstName"
                  name="username"
                  className="form-control"
                  placeholder="User name"
                />
              </div>
            </div>
            {/* Password */}
            <input
              type="password"
              id="defaultRegisterFormPassword"
              name="password"
              className="form-control"
              placeholder="Password"
              aria-describedby="defaultRegisterFormPasswordHelpBlock"
            />
            <small
              id="defaultRegisterFormPasswordHelpBlock"
              className="form-text text-muted mb-4"
            >
              At least 8 characters and 1 digit
            </small>
            <input
              type="password"
              id="defaultRegisterFormPassword"
              name="password2"
              className="form-control"
              placeholder="Password"
              aria-describedby="defaultRegisterFormPasswordHelpBlock"
            />
            <small
              id="defaultRegisterFormPhoneHelpBlock"
              className="form-text text-muted mb-4"
            >
              Optional - for two step authentication
            </small>
            {/* Newsletter */}
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="defaultRegisterFormNewsletter"
              />
              <label
                className="custom-control-label"
                htmlFor="defaultRegisterFormNewsletter"
              >
                Subscribe to our newsletter
              </label>
            </div>
            {/* Sign up button */}
            <button className="btn btn-info my-4 btn-block" type="submit">
              Sign in
            </button>
            {/* Social register */}
            <p>or sign up with:</p>
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
            <hr />
            {/* Terms of service */}
            <p>
              By clicking
              <em>Sign up</em> you agree to our
              <Link to="/register">terms of service</Link>
            </p>
          </form>
          ;{/* Default form register */}
        </div>
      </Fragment>
    );
  }
}
