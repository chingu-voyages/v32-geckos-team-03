import React from "react";

function SubmitButton(props) {
  return (
    <input
      name="submit"
      type="submit"
      label="submit"
      value={props.value || "Submit"}
      disabled={props.disabled}
      className={props.disabled ? "btn disabled-btn" : "btn red submit-btn"}
    />
  );
}

export default SubmitButton;
