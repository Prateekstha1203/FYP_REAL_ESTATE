import React from "react";
// import "./Sidebar.css";
import { Link } from "react-router-dom";
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
      </sidebar>
    </div>
  );
};

export default Sidebar;
