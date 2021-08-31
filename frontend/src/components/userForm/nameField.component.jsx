import React from 'react';

function NameField(props) {
  return (
    <input
      name="name"
      type="text"
      label="name"
      placeholder="name"
      className="form-input"
      disabled={props.disabled}
      value={props.value}
      onChange={props.changeHandler}
    />
  );
}

export default NameField;