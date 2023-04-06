import { useState, Fragment } from "react";
import MetaData from "../../more/Metadata";
import "./Search.css";
import { ExitToApp } from '@material-ui/icons';
import { Link } from "react-router-dom";
import React from "react";


const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/properties/${keyword}`);
    } else {
      history.push("/properties");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search" />
    </Fragment>
  );
};

export default Search;