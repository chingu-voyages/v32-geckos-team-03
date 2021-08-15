import React, { Component } from "react";
import SignUpForm from "../../components/signUpForm/signUpForm.component";

class SignUpPage extends Component {
  render() {
    return (
      <div className="sign-up-page card">
        <div className="header">
          <h1>Sign Up</h1>
        </div>
        <div className="main">
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default SignUpPage;
