import React, { Component } from "react";
import NameField from "./nameField.component";
import EmailField from "./emailField.component";
import PasswordField from "./passwordField.component";
import SubmitButton from "./submitButton.component";

class UserForm extends Component {
  fieldComponents = {
    name: NameField,
    email: EmailField,
    password: PasswordField,
  };

  renderChosenFields() {
    let chosenFields = this.props.fields;
    return chosenFields.map((field) => {
      if (this.fieldExists(field)) {
        const Component = this.getFieldComponent(field);
        return (
          <Component
            key={field}
            value={this.props[field]}
            changeHandler={this.props.changeHandler}
            disabled={this.fieldIsDisabled(field)}
          />
        );
      } else {
        throw new Error(`The '${field}' field does not exists.`);
      }
    });
  }

  fieldExists(field) {
    return field in this.fieldComponents;
  }

  getFieldComponent(field) {
    return this.fieldComponents[field];
  }

  fieldIsDisabled(field) {
    return this.props.disabled.includes(field);
  }

  renderSubmit() {
    return (
      <SubmitButton
        value={this.props.submit}
        disabled={this.fieldIsDisabled("submit")}
      />
    );
  }

  render() {
    return (
      <form
        method={this.props.method}
        action={this.props.action}
        onSubmit={this.props.submitHandler}
        className="user-form"
        autoComplete="off"
      >
        {this.renderChosenFields()}
        {this.renderSubmit()}
      </form>
    );
  }
}

export default UserForm;
