import React, { Component, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

class ProvideAuth extends Component {
  state = { user: undefined };

  componentDidMount() {
    this.setAuthContext();
  }

  async setAuthContext() {
    this.getUserInfo()
      .then((user) => {
        this.setState({ user });
      })
      .catch((error) => {
        this.setState({ user: null });
      });
  }

  async getUserInfo() {
    axios.defaults.withCredentials = true;
    return await axios({
      method: "GET",
      url: process.env.REACT_APP_BACKEND + "/user",
    });
  }

  render() {
    return <AuthContext.Provider value={this.state.user}>{this.props.children}</AuthContext.Provider>;
  }
}

export { ProvideAuth, AuthContext };
