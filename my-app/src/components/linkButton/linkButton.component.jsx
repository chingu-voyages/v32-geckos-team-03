import React from "react";

function LinkButton(props) {
  return (
    <a href={props.path} className="link-btn">
      {props.text}
    </a>
  );
}

export default LinkButton;
