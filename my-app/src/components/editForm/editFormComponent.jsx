import React, { Component } from "react";
import axios from "axios";
import UserForm from "../userForm/userForm.component";
import StatusMsg from "../../components/statusMsg/statusMsg.component";

class EditForm extends Component {
  fields = ["name", "email", "password"];

  constructor(props) {
    super(props);

    this.state = {
      status: "",
      name: "",
      email: "",
      password: "",
      disabled: ["email", "submit"],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setStatus("");
    this.editUserInfo()
      .then(() => this.setStatus("Successfully saved."))
      .catch((error) => this.setStatus(error));
  }

  componentDidMount() {
    this.loadUserInfoToFields()
      .then(() => this.enableSubmission())
      .catch((error) => this.setStatus(error.message));
  }

  async editUserInfo() {
    try {
      let response = await axios.post(
        process.env.REACT_APP_BACKEND + "/edit",
        {
          name: this.state.name,
          password: this.state.password,
        },
        { withCredentials: true }
      );
      return response;
    } catch {
      throw new Error("Could not save user information.");
    }
  }

  async loadUserInfoToFields() {
    let currentUser = await this.getUserInfo();
    if (currentUser) {
      this.setState({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }

  async getUserInfo() {
    try {
      let response = await axios.get(process.env.REACT_APP_BACKEND + "/user");
      return response?.data;
    } catch {
      throw new Error("Failed to load user info.");
    }
  }

  enableSubmission() {
    this.setState((state) => {
      return {
        disabled: state.disabled.filter((field) => field !== "submit"),
      };
    });
  }

  setStatus(message) {
    this.setState({
      status: message,
    });
  }

  render() {
    return (
      <>
        <StatusMsg message={this.state.status} />
        <UserForm
          fields={this.fields}
          disabled={this.state.disabled}
          method="post"
          action="/edit"
          name={this.state.name}
          email={this.state.email}
          password={this.state.password}
          submit="Save"
          submitHandler={this.handleSubmit}
          changeHandler={this.handleChange}
        />
      </>
    );
  }
}

export default EditForm;
