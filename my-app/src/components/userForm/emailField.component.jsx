import React from 'react';

function EmailField(props) {
  // console.log(props);
  return (
    <input
      name="email"
      type="email"
      label="email"
      placeholder="email"
      className="form-input"
      disabled={props.disabled}
      value={props.value}
      onChange={props.changeHandler}
    />
  );
}

export default EmailField;