import { Component } from "react";
import axios from "axios";

class LogoutPage extends Component {
  render() {
    axios.post(process.env.REACT_APP_BACKEND + "/logout").then((response) => {
      console.log(response);
      setTimeout(() => (window.location.href = "/login"), 500);
    });
    return (
      <div className="logout-page page card">
        <div className="page">Logging out...</div>
      </div>
    );
  }
}

export default LogoutPage;
