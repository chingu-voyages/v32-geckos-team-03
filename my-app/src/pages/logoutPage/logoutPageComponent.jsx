import { Component } from "react";
import axios from "axios";

class LogoutPage extends Component {
  render() {
    axios.post(process.env.REACT_APP_BACKEND + "/logout").then((window.location.href = "/login"));
    return null;
  }
}

export default LogoutPage;
