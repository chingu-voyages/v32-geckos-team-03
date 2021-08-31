import React from "react";
import "./selectionBox.styles.css";
import { Link } from "react-router-dom";

function SelectionBox({ title, buttonName, link }) {
  return (
    <div className="general-box box">
      <div className="box-title">{title}</div>
      <div className="box-body">
        <Link to={`/${link}`}>
          <button className="selection-btn btn">{buttonName}</button>
        </Link>
      </div>
    </div>
  );
}

export default SelectionBox;
