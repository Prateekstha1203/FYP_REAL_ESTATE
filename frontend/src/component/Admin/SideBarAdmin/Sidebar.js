import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import Logo from "../../../component/Common/fortune.png";
const Sidebar = () => {
  const button = () => {
    let items = document.querySelectorAll(".Dashboard__item");
  };

  return (
    <div>
      <sidebar>
        <div className="container-fluid">
          <div className="row">
            <div className="sidebar col-12">
              <div className="row mt-2">
                <div className="sidebar">
                  <Link to="/">
                    <img
                      src={Logo}
                      alt=""
                      className="logo"
                      style={{
                        width: "250px",
                        height: "150px",
                        objectFit: "contain",
                        cursor: "pointer",
                        margin: "0 0 0 20px",
                      }}
                    />
                  </Link>
                  <Link to="/dashboard">
                    <p className="Dashboard__item" onClick={button}>
                      <DashboardIcon /> Dashboard
                    </p>
                  </Link>
                  <Link to="/admin/properties">
                    <p className="Dashboard__item">
                      <PostAddIcon /> All Products
                    </p>
                  </Link>

                  <Link to="/admin/property">
                    <p>
                      <AddIcon />
                      Create Product
                    </p>
                  </Link>

                  <Link to="/admin/users">
                    <p>
                      <PeopleIcon /> Users
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </sidebar>
    </div>
  );
};

export default Sidebar;
