import React, { Component, Fragment } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: [],
      user: [],
      transactions: [],
      time: new Date()
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
    this.handleGetTransactions();
    this.intervalID = setInterval(() => this.getTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getTime() {
    this.setState({ time: new Date() });
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

  handleGetTransactions() {
    axios.get("http://localhost:2020/transactionList").then(res => {
      console.log(res.data);
      this.setState({ transactions: res.data });
    });
  }

  date() {
    let date = new Date();
    return <p>{date.toDateString()}</p>;
  }

  sale() {
    let data = 0;
    this.state.transactions.forEach(value => {
      data += value.total;
    });
    return <span>{data}</span>;
  }

  shipment() {
    let data = this.state.transactions.length;
    return <span>{data}</span>;
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
                    <Link to="/dashboard">
                      <i className="tim-icons icon-chart-pie-36" />
                      <p>Dashboard</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/notifications">
                      <i className="tim-icons icon-bell-55" />
                      <p>Notifications</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/userList">
                      <i className="tim-icons icon-single-02" />
                      <p>User List</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/transactionList">
                      <i className="tim-icons icon-bullet-list-67" />
                      <p>Transaction List</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/maps">
                      <i className="tim-icons icon-pin" />
                      <p>Maps</p>
                    </Link>
                  </li>
                  <li className="text-center" style={{ marginTop: "500px" }}>
                    <h6>{this.state.time.toLocaleTimeString()}</h6>
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
                            <h2 className="card-title">Data Analytics</h2>
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
                          {this.shipment()}
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
                          $ {this.sale()}
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
                          Recently Users Transaction &nbsp;
                          <i className="tim-icons icon-single-02 text-info" />
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table tablesorter ">
                            <thead className=" text-primary">
                              <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>City</th>
                                <th className="text-center">Total Expense</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.transactions.map(data => {
                                return (
                                  <tr key={data._id}>
                                    <td>{data.firstName}</td>
                                    <td>{data.country}</td>
                                    <td>{data.address}</td>
                                    <td className="text-center">
                                      $ {data.total}
                                    </td>
                                    {!data.status && (
                                      <td className="text-secondary">
                                        Pending
                                      </td>
                                    )}
                                    {data.status === "Accepted" && (
                                      <td className="text-success">
                                        In Transit
                                      </td>
                                    )}
                                    {data.status === "Declined" && (
                                      <td className="text-danger">
                                        Rejected
                                      </td>
                                    )}
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
                          Employee Of The Month &nbsp;
                          <i className="tim-icons icon-badge text-danger" />
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
