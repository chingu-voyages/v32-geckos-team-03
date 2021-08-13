import React from "react";

import "./linkButton.styles.css";

function LinkButton(props) {
  return (
    <a href={props.path} className="link-btn">
      {props.text}
    </a>
  );
}

export default LinkButton;
