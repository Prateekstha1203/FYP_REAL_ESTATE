import React from "react";
import "./header.css";
import Logo from "../fortune.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import ForgotPassword from "../../loginRegister/forget_password/ForgetPassword";
function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const isAgent = user && user.role === "agent";
  console.log('isAgent:', isAgent);
  return (
    <header id="header">
      {isAuthenticated ? null : (
        <div className="topBar">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-6">
                <div className="topBar-left">
                  <span>Furtune Real estate</span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="topBar-right ">
                  <ul className="navbar-nav ">
                    <li className="nav-item">
                      <Link to="/login" className="nav-link ">
                        LOGIN
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link ">
                        SIGN UP
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo}></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/properties" className="nav-link ">
                  PROPERTIES
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link ">
                  ABOUT US
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link ">
                  CONTACT US
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/agent" className="nav-link ">
                  AGENTS
                </Link>
              </li>
              {isAuthenticated && !isAgent && (
                <li className="nav-item">
                  <Link to="/wishlist" className="nav-link">
                    FAVOURITE
                  </Link>
                </li>
              )}
              {isAuthenticated && isAgent && (
                <li className="nav-item">
                  <Link to="/agent/property/new" className="nav-link">
                    Add Property
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
