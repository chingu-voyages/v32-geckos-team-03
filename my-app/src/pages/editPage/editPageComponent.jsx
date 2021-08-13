import React, { Component } from "react";
import EditForm from "../../components/editForm/editFormComponent";

class EditPage extends Component {
  render() {
    return (
      <div className="edit-page card">
        <div className="header">
          <h1>Edit Info</h1>
        </div>
        <div className="main">
          <EditForm />
        </div>
      </div>
    );
  }
}

export default EditPage;
