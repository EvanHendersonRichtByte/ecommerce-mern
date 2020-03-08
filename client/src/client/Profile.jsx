import React, { Component, Fragment } from "react";
import axios from "axios";
import EditProfile from "./EditProfile";
export default class Profile extends Component {
  constructor() {
    super();
    this.getUserProfile = this.getUserProfile.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.state = {
      user: [],
      username: "",
      description: "",
      age: 0,
      address: "",
      image: "",
      modalOpen: false
    };
  }

  componentDidMount() {
    this.getUserProfile();
  }

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
        <div>
          <div style={style} className=" container">
            <div className="span3 well">
              <center>
                
                  <img
                    src={`${process.env.PUBLIC_URL}/uploads/users/${this.state.user.image}`}
                    alt={this.state.user.username}
                    name="aboutme"
                    width={140}
                    height={140}
                    className="img-circle"
                  />
                <h3 className="kryptonite-text">{this.state.user.username}</h3>
                <p className="kryptonite-text card-text">age: {this.state.user.age}</p>
                <p className="kryptonite-text card-text">address: {this.state.user.address}</p>
                <em>{this.state.user.description}</em>
              </center>
              <button 
                      className="kryptonite-button btn btn-transparent text-success btn-block"
                      onClick={this.handleModalClose}
                    >
                      Edit Profile
                    </button>
                    <EditProfile
                      modalOpen={this.state.modalOpen}
                      handleModalClose={this.handleModalClose}
                    />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
