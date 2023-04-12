import React from "react";
// import "./Sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import Logo from "../../../component/Common/fortune.png";
import { NavLink } from "react-router-dom";
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
                <div className="row ">
                  <Link className="listing -mb-2" to="/">
                    <div className="heading">Fortune RealEstate</div>
                  </Link>
                  <NavLink className="listingType active " to="/dashboard">
                    <i class="dashboardIcon ms-4 me-3 fa-solid fa-house"></i>
                    <span className="title">Dashboard</span>
                  </NavLink>
                  <NavLink className="listingType  " to="/admin/properties">
                    <i class="dashboardIcon ms-4 me-3 fab fa-product-hunt"></i>
                    <span className="title">All Properties</span>
                  </NavLink>
                  <NavLink
                    className="listingType"
                    to={`/admin/users`}
                  >
                    <i className="dashboardIcon fas fa-users ms-4 me-4"></i>

                    <span className="title">Users</span>
                  </NavLink>
                  <NavLink className="listingType  mb-3" to="/logout">
                    <i class="dashboardIcon ms-4 me-3 fa-solid fa-arrow-right-from-bracket"></i>
                    <span className="title">Logout</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        {/* <div className="container-fluid">
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
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                        cursor: "pointer",
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
                      <PostAddIcon /> All Properties
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
        </div> */}
      </sidebar>
    </div>
  );
};

export default Sidebar;
