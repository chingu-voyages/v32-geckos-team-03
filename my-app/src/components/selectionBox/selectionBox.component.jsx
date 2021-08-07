import React from "react";
import "./selectionBox.styles.css";
import { Link } from "react-router-dom";

function SelectionBox({ title, buttonName, link }) {
  return (
    <div className="box">
      <h1>{title}</h1>

      <Link to={`/${link}`}>
        <button className="selection-btn">{buttonName}</button>
      </Link>
    </div>
  );
}

export default SelectionBox;
