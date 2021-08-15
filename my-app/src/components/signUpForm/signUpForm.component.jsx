import React, { Component } from "react";
import axios from "axios";
import UserForm from "../userForm/userForm.component";
import StatusMsg from "../statusMsg/statusMsg.component";

class SignUpForm extends Component {
  fields = ["name", "email", "password"];
  disabled = [];

  constructor(props) {
    super(props);

    this.state = {
      status: "",
      name: "",
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.register()
      .then(() => (window.location.href = "/login"))
      .catch((error) => this.setStatus(error));
  }

  async register() {
    try {
      let response = await axios({
        method: "POST",
        url: process.env.REACT_APP_BACKEND + "/sign-up",
        data: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        },
      });
      return response;
    } catch ({ response }) {
      if (response.status === 409) {
        throw new Error("Email already registered.");
      } else {
        throw new Error("Unknown registration error.");
      }
    }
  }

  setStatus(error) {
    this.setState({
      status: error.message,
    });
  }

  render() {
    return (
      <>
        <StatusMsg message={this.state.status} />
        <UserForm
          fields={this.fields}
          disabled={this.disabled}
          name={this.state.name}
          email={this.state.email}
          password={this.state.password}
          submit="Sign Up"
          submitHandler={this.handleSubmit}
          changeHandler={this.handleChange}
        />
      </>
    );
  }
}

export default SignUpForm;
