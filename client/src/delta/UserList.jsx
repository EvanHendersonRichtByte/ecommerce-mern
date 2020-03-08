import React, { Component } from "react";
import axios from "axios";
class UserList extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      user: []
    };
  }
  getData() {
    axios
      .get("http://localhost:2020/user")
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }
  render() {
    return (
      <div>
        {this.state.user.map(res => {
          return (
            <div>
              <p key={res._id}>{res._id}</p>
              <p>{res.username}</p>
              <p>{res.password}</p>
            </div>
          );
        })}
        <p>{this.getData()}</p>
      </div>
    );
  }
}
export default UserList;
