import React, { Component } from "react";
import LoginForm from "../../components/loginForm/loginForm.component";

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page card">
        <div className="header">
          <h1>Login</h1>
        </div>
        <div className="main">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
