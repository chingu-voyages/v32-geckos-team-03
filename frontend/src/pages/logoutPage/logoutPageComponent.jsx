import { Component } from "react";
import axios from "axios";

class LogoutPage extends Component {
  render() {
    axios.get(process.env.REACT_APP_BACKEND + "/logout").then((window.location.href = "/login"));
    return null;
  }
}

export default LogoutPage;
