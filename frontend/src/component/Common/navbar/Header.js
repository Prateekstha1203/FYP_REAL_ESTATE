import React from "react";
import { FaPhoneSquare, FaSearch } from "react-icons/fa";
import "./header.css";
import { useEffect, useState } from "react";
import Logo from "../fortune.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
function Header() {
  
  return (
    <header id="header">
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
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  PROPERTIES
                </Link>
                <ul className="dropdown-menu dropdown-menu-end fade-down">
                  <li>
                    <Link className="dropdown-item" to="/property/sell">
                      Sell
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/property/rent">
                      Rent
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/properties">
                      All Properties
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link ">
                  ABOUT US
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contactus" className="nav-link ">
                  CONTACT US
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/agents" className="nav-link ">
                  AGENTS
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  Dropdown right
                </Link>
                <ul className="dropdown-menu dropdown-menu-end fade-down">
                  <li>
                    <Link className="dropdown-item" to="/">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout">
                      Logout 
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
