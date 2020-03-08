import React, { Component, Fragment } from "react";
import axios from "axios";
import Footer from "../components/Footer";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: [],
      user: []
    };
  }

  componentDidMount() {
    window.onload = function() {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
    };
    window.onload();
    this.handleGetAdmin();
    this.handleGetUser();
  }

  handleGetAdmin() {
    axios
      .get("http://localhost:2020/adminList")
      .then(res => this.setState(() => ({ admin: res.data })));
  }

  handleGetUser() {
    axios
      .get("http://localhost:2020/userList")
      .then(res => this.setState(() => ({ user: res.data })));
  }

  render() {
    const style = {
      marginTop: "70px"
    };
    return (
      <Fragment>
        <div style={style}>
          <div className="wrapper ">
            <div className="sidebar">
              {/*
  Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
    */}
              <div className="sidebar-wrapper">
                <ul className="nav">
                  <li>
                    <a href="./dashboard.html">
                      <i className="tim-icons icon-chart-pie-36" />
                      <p>Dashboard</p>
                    </a>
                  </li>
                  <li>
                    <a href="./icons.html">
                      <i className="tim-icons icon-atom" />
                      <p>Icons</p>
                    </a>
                  </li>
                  <li>
                    <a href="./map.html">
                      <i className="tim-icons icon-pin" />
                      <p>Maps</p>
                    </a>
                  </li>
                  <li>
                    <a href="./notifications.html">
                      <i className="tim-icons icon-bell-55" />
                      <p>Notifications</p>
                    </a>
                  </li>
                  <li>
                    <a href="./user.html">
                      <i className="tim-icons icon-single-02" />
                      <p>User Profile</p>
                    </a>
                  </li>
                  <li>
                    <a href="./tables.html">
                      <i className="tim-icons icon-puzzle-10" />
                      <p>Table List</p>
                    </a>
                  </li>
                  <li>
                    <a href="./typography.html">
                      <i className="tim-icons icon-align-center" />
                      <p>Typography</p>
                    </a>
                  </li>
                  <li>
                    <a href="./rtl.html">
                      <i className="tim-icons icon-world" />
                      <p>RTL Support</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="main-panel">
              {/* Navbar */}

              <div
                className="modal fade"
                id="searchModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="searchModal"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <input
                        type="text"
                        className="form-control"
                        id="inlineFormInputGroup"
                        placeholder="SEARCH"
                      />
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <i className="tim-icons icon-simple-remove" />
                      </button>
                    </div>
                    <div className="modal-footer"></div>
                  </div>
                </div>
              </div>
              {/* End Navbar */}
              <div className="content">
                <div className="row">
                  <div className="col-12">
                    <div className="card card-chart">
                      <div className="card-header ">
                        <div className="row">
                          <div className="col-sm-6 text-left">
                            <h5 className="card-category">Total Shipments</h5>
                            <h2 className="card-title">Performance</h2>
                          </div>
                          <div className="col-sm-6">
                            <div
                              className="btn-group btn-group-toggle float-right"
                              data-toggle="buttons"
                            >
                              <label
                                className="btn btn-sm btn-danger btn-simple active"
                                id={0}
                              >
                                <input
                                  type="radio"
                                  name="options"
                                  autoComplete="off"
                                  defaultChecked
                                />{" "}
                                Accounts
                              </label>
                              <label
                                className="btn btn-sm btn-danger btn-simple "
                                id={1}
                              >
                                <input
                                  type="radio"
                                  name="options"
                                  autoComplete="off"
                                />{" "}
                                Purchases
                              </label>
                              <label
                                className="btn btn-sm btn-danger btn-simple "
                                id={2}
                              >
                                <input
                                  type="radio"
                                  name="options"
                                  autoComplete="off"
                                />{" "}
                                Sessions
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="chart-area">
                          <canvas id="chartBig1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card card-chart">
                      <div className="card-header ">
                        <h5 className="card-category">Total Shipments</h5>
                        <h3 className="card-title">
                          <i className="tim-icons icon-bell-55 text-danger " />{" "}
                          {Math.floor(Math.random() * (200 * 100))}
                        </h3>
                      </div>
                      <div className="card-body ">
                        <div className="chart-area">
                          <canvas id="chartLinePurple" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card card-chart">
                      <div className="card-header ">
                        <h5 className="card-category">Daily Sales</h5>
                        <h3 className="card-title">
                          <i className="tim-icons icon-delivery-fast text-info " />{" "}
                         $ {Math.floor(Math.random() * 1000000)}
                        </h3>
                      </div>
                      <div className="card-body ">
                        <div className="chart-area">
                          <canvas id="CountryChart" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card card-chart">
                      <div className="card-header ">
                        <h5 className="card-category">Completed Tasks</h5>
                        <h3 className="card-title">
                          <i className="tim-icons icon-send text-success " />{" "}
                          12,100K
                        </h3>
                      </div>
                      <div className="card-body ">
                        <div className="chart-area">
                          <canvas id="chartLineGreen" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="card ">
                      <div className="card-header">
                        <h4 className="card-title">
                          {" "}
                          Recently Users Transaction{" "}
                          <i className="tim-icons icon-single-02 text-info" />{" "}
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table tablesorter ">
                            <thead className=" text-primary">
                              <tr>
                                <th>Name</th>
                                <th>City</th>
                                <th>Age</th>
                                <th className="text-center">Total Expense</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.user.map(data => {
                                return (
                                  <tr key={data._id}>
                                    <td>
                                      {data.username[0].toUpperCase() +
                                        data.username.slice(1)}
                                    </td>
                                    {!data.address ? (
                                      <td>Unknown</td>
                                    ) : (
                                      <td>{data.address}</td>
                                    )}
                                    {!data.age ? (
                                      <td>Unknown</td>
                                    ) : (
                                      <td>{data.age}</td>
                                    )}
                                    <td className="text-center">
                                      $
                                      {Math.floor(
                                        Math.random() * (120 + 10000)
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 text-primary">
                    <div className="card ">
                      <div className="card-header">
                        <h4 className="card-title">
                          {" "}
                          Employee Of The Month{" "}
                          <i className="tim-icons icon-badge text-danger" />{" "}
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table tablesorter ">
                            <thead className=" text-primary">
                              <tr>
                                <th>Name</th>
                                <th>City</th>
                                <th>Age</th>
                                <th className="text-center">Salary</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.admin.map(data => {
                                return (
                                  <tr key={data._id}>
                                    <td>
                                      {data.username[0].toUpperCase() +
                                        data.username.slice(1)}
                                    </td>
                                    <td>{data.address}</td>
                                    <td>{data.age}</td>
                                    <td className="text-center">
                                      $
                                      {Math.floor(
                                        Math.random() * (120 + 100000)
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
