//
// ────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: C H E C K I N G   P R O F I L E   I M A G E   I D E A : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────

// USE componentDidMount ? useEffect ?
// condition if image is added

// ────────────────────────────────────────────────────────────────────────────────
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// ─── OTHER ──────────────────────────────────────────────────────────────────────
import Logo from "../res/images/devil.png";
// ────────────────────────────────────────────────────────────────────────────────

const Navbar = () => {
  let _id = JSON.parse(localStorage.getItem("_id"));
  let token = JSON.parse(localStorage.getItem("Token"));
  let role = JSON.parse(localStorage.getItem("Role"));
  let address = JSON.parse(localStorage.getItem("Address"));
  let image = localStorage.getItem("Image");
  if (image) {
    image = JSON.parse(image);
  }
  let Cart = localStorage.getItem("Cart");
  console.log(
    `_id = ${_id}               Token = ${token}                                                                                           Role = ${role}`
  );
  const handleSettings = () => {
    alert("Premium Account Only!");
    window.location.assign("/");
  };
  const logout = () => {
    // Remove * from localStorage
    localStorage.removeItem("_id");
    localStorage.removeItem("Token");
    localStorage.removeItem("Role");
    localStorage.removeItem("Address");
    if (Cart) {
      localStorage.removeItem("Cart");
    }
    if (image) {
      localStorage.removeItem("Image");
    }
    window.location.assign("/");
  };

  const isSetup = () => {
    if (!address) {
      alert("Welcome New User!");
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/setupProfile">
            Setup New Profile
          </Link>
        </li>
      );
    }
  };

  const isLogged = () => {
    if (!token) {
      return (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </Fragment>
      );
    } else {
      if (role === "User") {
        return (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            {isSetup()}
            <li className="dropdown nav-item">
              <a
                href="!#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <div className="photo">
                  <img
                    alt="haah"
                    src={`${process.env.PUBLIC_URL}/uploads/users/${image}`}
                  />
                </div>
                <p className="d-lg-none">Log out</p>
              </a>
              <ul className="dropdown-menu dropdown-navbar">
                <li className="nav-link">
                  <Link to="/profile/" className="nav-item dropdown-item">
                    Profile
                  </Link>
                </li>
                <li className="nav-link">
                  <Link
                    to="/transactionList"
                    className="nav-item dropdown-item"
                  >
                    Transaction List
                  </Link>
                </li>
                <li className="nav-link">
                  <button
                    onClick={handleSettings}
                    className="nav-item dropdown-item"
                  >
                    Settings
                  </button>
                </li>
                <div className="dropdown-divider" />
                <li className="nav-link">
                  <button onClick={logout} className="nav-item dropdown-item">
                    Log out
                  </button>
                </li>
              </ul>
            </li>
          </Fragment>
        );
      } else if (role === "Admin") {
        return (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link text-danger" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addProduct">
                Add Product
              </Link>
            </li>
            {isSetup()}
            <li className="dropdown nav-item">
              <a
                href="!#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <div className="photo">
                  <img
                    alt="haah"
                    src={`${process.env.PUBLIC_URL}/uploads/users/${image}`}
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-navbar">
                <li className="nav-link">
                  <Link to="/profile/" className="nav-item dropdown-item">
                    Profile
                  </Link>
                </li>
                <li className="nav-link">
                  <button
                    onClick={handleSettings}
                    className="nav-item dropdown-item"
                  >
                    Settings
                  </button>
                </li>
                <div className="dropdown-divider" />
                <li className="nav-link">
                  <button onClick={logout} className="nav-item dropdown-item">
                    Log out
                  </button>
                </li>
              </ul>
            </li>
          </Fragment>
        );
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="kryptonite-navbar-icon">
              <img
                alt="kryptonite's logo"
                style={{ width: "35px", height: "35px" }}
                src={Logo}
              />
              &nbsp;
              <strong className="text-light"> krypton</strong>
              <span className="text-danger">
                <strong>ite</strong>
              </span>
            </div>
          </Link>
          <ul className="navbar-nav ml-auto">{isLogged()} </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
