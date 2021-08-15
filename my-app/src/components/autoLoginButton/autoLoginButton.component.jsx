import React, { Component } from "react";
import axios from "axios";

class AutoLoginButton extends Component {
  constructor(props) {
    super(props);
    this.autoLogin = this.autoLogin.bind(this);
  }

  autoLogin() {
    axios
      .post(
        process.env.REACT_APP_BACKEND + "/login",
        {
          email: "autologin@email.com",
          password: "autologin",
        },
        {
          withCredentials: true,
        }
      )
      .then(() => (window.location.href = "/"))
      .catch((error) => {
        console.log(error);
        throw new Error("Auto login failed");
      });
  }

  render() {
    return (
      <button type="button" className="submit-btn" onClick={this.autoLogin}>
        Auto Login (Dev)
      </button>
    );
  }
}

export default AutoLoginButton;
