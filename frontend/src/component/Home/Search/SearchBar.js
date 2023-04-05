import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./searchBar.css";
import backgroundImage from "../../../assets/img/houses/house1lg.png";
import { useHistory } from "react-router-dom";
const SearchProperty = () => {

  const [keyword, setkeyword] = useState("");
  const history = useHistory();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/properties/${keyword}`);
    } else {
      history.push("/properties");
    }
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
      <form onSubmit={searchSubmitHandler} className="searchForm">
        <input className="searchInput"
          type="search"
          placeholder="Enter your property Address"
          id="address-input"
          value={keyword}
          onChange={(e) => setkeyword(e.target.value)}
        />
        <i class="fa fa-search"  onClick={searchSubmitHandler}></i>
      </form>
    </div>
  );
};

export default SearchProperty;

