import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Hamburger } from "../images/hamburger.svg";
import { ReactComponent as Brand } from "../images/logo.svg";
import { useAuthentication } from "../../../context/authentication";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [authentication, setAuthentication] = useAuthentication();
  const logout = () => {
    setAuthentication({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  const loggedIn =
    authentication.user !== null &&
    authentication.token !== "" &&
    authentication.refreshToken !== "";
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Brand />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            {!loggedIn ? (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            ) : (
              ""
            )}
            {loggedIn ? (
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Users
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">
                    Dashboard
                  </button>
                  <button
                    onClick={logout}
                    className="dropdown-item"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
