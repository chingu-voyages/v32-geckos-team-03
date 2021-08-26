import React, { Component } from "react";
import axios from "axios";
import UserForm from "../userForm/userForm.component";
import StatusMsg from "../../components/statusMsg/statusMsg.component";

class LoginForm extends Component {
  fields = ["email", "password"];
  disabled = [];

  constructor(props) {
    super(props);

    this.state = {
      status: "",
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
    this.login()
      .then((response) => {
        console.log(response);
        window.location.href = "/";
      })
      .catch((error) => this.setStatus(error));
  }

  async login() {
    try {
      let response = await axios({
        method: "POST",
        url: process.env.REACT_APP_BACKEND + "/login",
        data: {
          email: this.state.email,
          password: this.state.password,
        },
        validateStatus: (status) => status === 200,
        withCredentials: false,
      });
      return response;
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        throw new Error("Email or password incorrect.");
      } else {
        throw new Error("Unknown login error.");
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
          email={this.state.email}
          password={this.state.password}
          submit="Enter"
          submitHandler={this.handleSubmit}
          changeHandler={this.handleChange}
        />
      </>
    );
  }
}

export default LoginForm;
