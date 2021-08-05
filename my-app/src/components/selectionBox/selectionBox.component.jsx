import React from "react";
import "./selectionBox.styles.css";

function SelectionBox({ title, buttonName }) {
  return (
    <div className="box">
      <h1>{title}</h1>
      <button className="selection-btn">{buttonName}</button>
    </div>
  );
}

export default SelectionBox;
