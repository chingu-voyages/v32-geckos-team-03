import React from 'react';

function PasswordField(props) {
  return (
    <input
      name="password"
      type="password"
      label="password"
      placeholder="password"
      className="form-input"
      disabled={props.disabled}
      value={props.value}
      onChange={props.changeHandler}
    />
  );
}

export default PasswordField;