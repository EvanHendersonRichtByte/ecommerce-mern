import React, { Component, Fragment } from "react";
import axios from "axios";

export default class UserList extends Component {
  constructor() {
    super();
    this.handleData = this.handleData.bind(this);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.handleData();
  }

  handleData() {
    axios
      .get("http://localhost:2020/user")
      .then(res => {
        this.setState(() => ({ users: res.data }));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Fragment>
        <div className="col-col-md-12">
          <table style={{ marginTop: "100px" }} className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Age</th>
                <th>Address</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(data => {
                return (
                  <tr key={data._id}>
                    <th scope="row">{data._id}</th>
                    <th>{data.username}</th>
                    <th>
                      {data.age ? (
                        <span>{data.age}</span>
                      ) : (
                        <span>No data</span>
                      )}
                    </th>
                    <th>
                      {data.address ? (
                        <span>{data.address}</span>
                      ) : (
                        <span>No data</span>
                      )}
                    </th>
                    <th>
                      {data.description ? (
                        <span>{data.description}</span>
                      ) : (
                        <span>No data</span>
                      )}
                    </th>
                    <th>
                      {data.image ? (
                        <img
                          style={{ width: "100px", height: "100px" }}
                          alt={data.username}
                          src={`${process.env.PUBLIC_URL}/uploads/users/${data.image}`}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}
