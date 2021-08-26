import React, { Component } from "react";

class StatusMsg extends Component {
  render() {
    return <div className="status-msg">{this.props.message}</div>;
  }
}

export default StatusMsg;
