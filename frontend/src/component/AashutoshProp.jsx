import React, { useEffect, useState } from "react";
import Footer from "./Common/footer/Footer";
import Header from "./Common/navbar/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../more/Loader";
import PropertyCard from "./Common/CardComponent/PropertyCard";
import { getProperty } from "../actions/PropertyActions";
import Pagination from "react-js-pagination";
import "./Property/Properties.css";
import Typography from "@material-ui/core/Typography";
import MetaData from "../more/Metadata";
import "../component/Aashutosh.css";

const categories = ["Bungalow", "Villa", "Apartment"];

const Aashutosh = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");

  const {
    properties,
    loading,
    error,
    propertiesCount,
    resultPerPage,
  } = useSelector((state) => state.properties);

  const keyvalue = match.params.keyvalue;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (category === "All") {
      dispatch(getProperty(keyvalue, currentPage));
    } else {
      dispatch(getProperty(keyvalue, currentPage, category));
    }
  }, [dispatch, keyvalue, currentPage, category, error]);

  return (
    <>
      <Header />

      <div className="container-fluid bg-success">
        <div className="row">
          <div className="col-2 bg-primary">hhahahahha</div>
          <div className="col-10">
            <div className="row rightContent">
              <div className="feature col-8 d-flex justify-content-end">
                <h2 style={{ fontSize: "1.4vmax" }} className="feature d-flex justify-content-end">Featured Products</h2>
              </div>
              <div className="col-4">
                <input
                  class=" search my-5 form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Aashutosh;
