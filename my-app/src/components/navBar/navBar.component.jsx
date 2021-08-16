import React from "react";
import LinkButton from "../linkButton/linkButton.component";

import "./navBar.styles.css";

function NavBar(props) {
  return (
    <nav className="nav-bar">
      <ul>
        {props.isAuthenticated ? (
          <>
            <li>
              <LinkButton text="Home" path="/" />
            </li>
            <li>
              <LinkButton text="Edit User" path="/edit" />
            </li>
            <li>
              <LinkButton text="Previous Scores" path="/scores" />
            </li>
            <li>
              <LinkButton text="Ranking" path="/ranking" />
            </li>
            <li>
              <LinkButton text="Logout" path="/logout" />
            </li>
          </>
        ) : (
          <>
            <li>
              <LinkButton text="Login" path="/login" />
            </li>
            <li>
              <LinkButton text="Sign Up" path="/sign-up" />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
