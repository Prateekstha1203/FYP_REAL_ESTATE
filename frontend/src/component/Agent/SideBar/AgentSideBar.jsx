import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./agentSidebar.css";
import Fortune from "../../Common/fortune.png";
const AgentSidebar = ({ id }) => {
  return (
    <>
      <div>
        <sidebar>
          <div className="container-fluid">
            <div className="row">
              <div className="sidebar col-12">
                <div className="row ">
                  <Link className="listing -mb-2" to="/">
                    <div className="heading">Fortune RealEstate</div>
                  </Link>
                  <NavLink className="listingType active" to="/agentDashboard">
                    <i class="dashboardIcon ms-4 me-3 fa-solid fa-house"></i>
                    <span className="title">Dashboard</span>
                  </NavLink>
                  <NavLink className="listingType  " to="/agent/property">
                    <i class="dashboardIcon ms-4 me-3 fa-solid fa-calendar"></i>
                    <span className="title">Create Listing</span>
                  </NavLink>
                  <NavLink
                    className="listingType"
                    to={`/agent/viewlisting/${id}`}
                  >
                    <i className="dashboardIcon ms-4 me-4"></i>
                    <span className="title">View Listing</span>
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
    </>
  );
};

export default AgentSidebar;
