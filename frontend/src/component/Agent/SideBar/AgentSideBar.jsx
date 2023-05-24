import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./agentSidebar.css";
import Fortune from "../../Common/fortune.png";
import { useSelector } from "react-redux";
const AgentSidebar = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
console.log(user._id)
  return (
    <>
      <div>
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
                    to={`/agent/viewlisting/${user._id}`}
                  >
                    <i className="dashboardIcon ms-4 me-4 fas fa-list-alt"></i>
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
      </div>
    </>
  );
};

export default AgentSidebar;