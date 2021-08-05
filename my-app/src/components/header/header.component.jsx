import React from "react";
import "./header.styles.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <nav className="navbar">
      <ul className="list">
        <li className="list-item">
          <Link to="/register">Sign Up</Link>
        </li>
        <li className="list-item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
