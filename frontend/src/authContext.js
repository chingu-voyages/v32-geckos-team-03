import React, { Component, createContext } from "react";
import axios from "axios";
// import fetch from "node-fetch";

const AuthContext = createContext();

class ProvideAuth extends Component {
  state = { user: undefined };

  componentDidMount() {
    axios.interceptors.request.use((request) => {
      console.log("Starting Request", JSON.stringify(request, null, 2));
      return request;
    });

    axios.interceptors.response.use((response) => {
      console.log("Response:", JSON.stringify(response, null, 2));
      return response;
    });

    this.setAuthContext();
  }

  async setAuthContext() {
    this.getUserInfo()
      .then((user) => {
        this.setState({ user });
      })
      .catch((error) => {
        console.dir(error);
        this.setState({ user: null });
      });
  }

  async getUserInfo() {
    axios.defaults.withCredentials = true;
    let response = await axios({
      method: "GET",
      url: process.env.REACT_APP_BACKEND + "/user",
      withCredentials: true,
    });
    console.dir(response);
    return response;
  }

  render() {
    return <AuthContext.Provider value={this.state.user}>{this.props.children}</AuthContext.Provider>;
  }
}

export { ProvideAuth, AuthContext };
