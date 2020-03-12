import React, { Component } from "react";
import axios from "axios";

export default class Notifications extends Component {
  constructor() {
    super();
    this.handleData = this.handleData.bind(this);
    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    this.handleData();
  }

  handleData() {
    axios
      .get("http://localhost:2020/transaction")
      .then(res => {
        this.setState(() => ({ transactions: res.data }));
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <div className="container">
          {this.state.transactions.map(data => {
            return (
              <div className="well bg-light border rounded border-warning">
                <div className="media">
                  <div className="media-body">
                    <h4 className="kryptonite-text media-heading">{`${data.carts.length} Carts`}</h4>
                    <p className="kryptonite-text text-right">{`${data.firstName} ${data.lastName}`}</p>
                    <div className="kryptonite-text">
                      <ol>
                        {data.carts.map(value => {
                          return <li key={data._id} className="kryptonite-text">{value.title}</li>;
                        })}
                      </ol>
                    </div>
                    <ul className="list-inline list-unstyled">
                      <li className="kryptonite-text">
                        <span>
                          <i className="kryptonite-text glyphicon glyphicon-calendar" />{" "}
                          Exp Date: {data.expiration}{" "}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
