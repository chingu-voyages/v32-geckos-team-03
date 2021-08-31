import React, { useEffect, useState } from "react";
import LinkButton from "../linkButton/linkButton.component";

function NavBar(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [show, setShow] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const openMenu = () => {
    setIsMobile(!isMobile);
    setShow(!show);
  };

  const closeMenu = () => {
    setIsMobile(!isMobile);
    setShow(!show);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    }
  }, []);
  // console.log(isMobile);
  return (
    <>
      <nav className={isMobile ? "nav-bar close-menu" : " nav-bar open-menu"}>
        <div className="logo" onClick={() => (window.location.href = "/")}></div>
        <ul>
          {props.isAuthenticated ? (
            <>
              {/* <li>
                <LinkButton text="Home" path="/" />
              </li> */}
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

      {/* {isMobile ? (
        <div className="mobile-menu icon" onClick={openMenu}>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
        </div>
      ) : (
        <div className={show ? "show icon" : "hide icon"} onClick={closeMenu}>
          X
        </div>
      )} */}
    </>
  );
}

export default NavBar;
