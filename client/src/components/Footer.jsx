import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark page-footer font-small mdb-color pt-4">
      {/* Footer Links */}
      <div className="container text-center text-md-left">
        {/* Footer links */}
        <div className="row text-center text-md-left mt-3 pb-3">
          {/* Grid column */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-light text-uppercase mb-4 font-weight-bold">
              Kryptonite
            </h6>
            <p className="text-light">
              Fugit a qui et quaerat quis similique laboriosam animi. Esse sunt
              laborum molestiae. In quo nihil sint beatae repellat ex ea sed
              veniam. Recusandae rerum dolores eaque odit cum. Non doloribus
              quibusdam
            </p>
          </div>
          {/* Grid column */}
          <hr className="w-100 clearfix d-md-none" />
          {/* Grid column */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6
              className="text-light text-uppercase mb-4 font-weight-bold"
              style={{ textDecoration: "none" }}
            >
              Products
            </h6>
            <p>
              <a
                className="text-light"
                href="#!"
                style={{ textDecoration: "none" }}
              >
                Statistic Data
              </a>
            </p>
            <p>
              <a
                className="text-light"
                href="#!"
                style={{ textDecoration: "none" }}
              >
                Internal Database
              </a>
            </p>
            <p>
              <a
                className="text-light"
                href="#!"
                style={{ textDecoration: "none" }}
              >
                S4 Server
              </a>
            </p>
            <p>
              <a
                className="text-light"
                href="#!"
                style={{ textDecoration: "none" }}
              >
                MyISAM
              </a>
            </p>
          </div>
          {/* Grid column */}
          <hr className="w-100 clearfix d-md-none" />
          {/* Grid column */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-light text-uppercase mb-4 font-weight-bold">
              Useful links
            </h6>
            <p>
              <a
                className="text-light"
                href="#!"
                style={{ textDecoration: "none" }}
              >
                Your Account
              </a>
            </p>
            <p>
              <a
                className="text-light"
                href="#!"
                style={{ textDecoration: "none" }}
              >
                Become an Affiliate
              </a>
            </p>
            <p>
              <a
                className="text-light"
                href="#!"
                style={{ textDecoration: "none" }}
              >
                Shipping Rates
              </a>
            </p>
            <p>
              <a
                className="text-light"
                href="#!"
                style={{ textDecoration: "none" }}
              >
                Help
              </a>
            </p>
          </div>
          {/* Grid column */}
          <hr className="w-100 clearfix d-md-none" />
          {/* Grid column */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-light text-uppercase mb-4 font-weight-bold">
              Contact
            </h6>
            <p className="text-light">
              <i className="text-light fas fa-home mr-3" /> New York, NY 10012,
              US
            </p>
            <p className="text-light">
              <i className="text-light fas fa-envelope mr-3" /> info@gmail.com
            </p>
            <p className="text-light">
              <i className="text-light fas fa-phone mr-3" /> + 01 234 567 88
            </p>
            <p className="text-light">
              <i className="text-light fas fa-print mr-3" /> + 01 234 567 89
            </p>
          </div>
          {/* Grid column */}
        </div>
        {/* Footer links */}
        <hr className="bg-light"/>
        {/* Grid row */}
        <div className="row d-flex align-items-center">
          {/* Grid column */}
          <div className="col-md-7 col-lg-8">
            {/*Copyright*/}
            <p className="text-light text-center text-md-left">
              © 2025 Copyright:
              <a style={{ textDecoration: "none" }} href="/">
                <strong> Kryptonite Corporation</strong>
              </a>
            </p>
          </div>
          {/* Grid column */}
          {/* Grid column */}
          <div className="col-md-5 col-lg-4 ml-lg-0">
            {/* Social buttons */}
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    href="/"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="text-light fab fa-facebook-f" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="/"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="text-light fab fa-twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="/"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="text-light fab fa-google-plus-g" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="/"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="text-light fab fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Grid column */}
        </div>
        {/* Grid row */}
      </div>
    </footer>
  );
};

export default Footer;
