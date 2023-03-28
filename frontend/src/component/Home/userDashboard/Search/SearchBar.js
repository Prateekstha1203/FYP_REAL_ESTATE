import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./searchBar.css";
import backgroundImage from "../../../../assets/img/houses/house1lg.png";
const SearchProperty = () => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch();
  };

  return (
    <div
      className="search-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="searchContent  text-center">
      <h1>Let me Find your dream place right now</h1>
      <h3>Search the best selection of real estate</h3>
      </div>
      <form onSubmit={handleSearch} className="searchForm">
        <input className="searchInput"
          type="search"
          placeholder="Enter your property Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <i class="fa fa-search"></i>
      </form>
    </div>
  );
};

export default SearchProperty;



