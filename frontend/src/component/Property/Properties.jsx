
import React, { useEffect, useState } from "react";
import Footer from "../Common/footer/Footer";
import Header from "../Common/navbar/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import PropertyCard from "../Common/CardComponent/PropertyCard";
import { getProperty } from "../../actions/PropertyActions";
import Pagination from "react-js-pagination";
import "./Properties.css";
import MetaData from "../../more/Metadata";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

const categories = ["All", "Banglow", "Villa", "Apartment"];
const propertyTypes = ["All", "Rent", "Sale"];
const Properties = ({ match, history }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const {
    properties,
    loading,
    error,
    propertiesCount,
    resultPerPage,
  } = useSelector((state) => state.properties);

  const keyword = match.params.keyword;

  const [categoryCheckboxes, setCategoryCheckboxes] = useState(
    categories.reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {})
  );
  const [propertyTypeCheckboxes, setPropertyTypeCheckboxes] = useState(
    propertyTypes.reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {})
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const handleCategoryCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newCategoryCheckboxes = { ...categoryCheckboxes };

    // uncheck all other checkboxes
    Object.keys(newCategoryCheckboxes).forEach((key) => {
      if (key !== name) {
        newCategoryCheckboxes[key] = false;
      }
    });

    // set the selected checkbox
    newCategoryCheckboxes[name] = checked;

    setCategoryCheckboxes(newCategoryCheckboxes);
  };

  const handlePropertyTypeCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newPropertyTypeCheckboxes = { ...propertyTypeCheckboxes };

    // uncheck all other checkboxes
    Object.keys(newPropertyTypeCheckboxes).forEach((key) => {
      if (key !== name) {
        newPropertyTypeCheckboxes[key] = false;
      }
    });

    // set the selected checkbox
    newPropertyTypeCheckboxes[name] = checked;

    setPropertyTypeCheckboxes(newPropertyTypeCheckboxes);
  };

  useEffect(() => {
    if (category === "All" && propertyType === "All") {
      dispatch(getProperty(keyword, currentPage));
    } else if (category === "All") {
      dispatch(getProperty(keyword, currentPage, "", propertyType));
    } else if (propertyType === "All") {
      dispatch(getProperty(keyword, currentPage, category, ""));
    } else {
      dispatch(getProperty(keyword, currentPage, category, propertyType));
    }
  }, [dispatch, keyword, currentPage, category, error, propertyType]);

  useEffect(() => {
    const selectedCategories = Object.keys(categoryCheckboxes).filter(
      (key) => categoryCheckboxes[key]
    );
    const selectedPropertyTypes = Object.keys(propertyTypeCheckboxes).filter(
      (key) => propertyTypeCheckboxes[key]
    );
    setCategory(selectedCategories.join(","));
    setPropertyType(selectedPropertyTypes.join(","));
  }, [categoryCheckboxes, propertyTypeCheckboxes]);

  const [keyvalue, setKeyvalue] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyvalue.trim()) {
      history.push(`/properties/${keyvalue}`);
    } else {
      history.push("/properties");
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <Header />
          <div className="container ">
            <div className="row">
              <div className="col-3  py-4">
                <div className="row">
                  <h3>Filter Properties</h3>
                  <div className="category my-4">
                    <h4>CATEGORY </h4>
                    <div className="categoryCheck">
                      {categories.map((category) => (
                        <div key={category}>
                          <label className="d-flex label">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name={category}
                              checked={categoryCheckboxes[category]}
                              onChange={handleCategoryCheckboxChange}
                            />
                            <span className="categorylist"> {category}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="category my-4">
                    <h4>PROPERTY TYPE </h4>
                    <div className="categoryCheck">
                      {propertyTypes.map((propertyType) => (
                        <div key={propertyType}>
                          <label className="d-flex label">
                            <input
                              type="checkbox"
                              className="checkbox"
                              name={propertyType}
                              checked={propertyTypeCheckboxes[propertyType]}
                              onChange={handlePropertyTypeCheckboxChange}
                            />
                            <span className="categorylist">
                              {" "}
                              {propertyType}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-9 ">
                <div className="row ">
                  <div className="d-flex align-align-items-center justify-content-between py-4">
                    <div>
                      <h3 className="d-flex align-items-center justify-content-center ">
                        Featured Properties
                      </h3>
                    </div>
                    <div className="p-0  ">
                      <TextField
                        id="search"
                        type="search"
                        label="SearchProperty"
                        value={keyvalue}
                        onChange={(e) => setKeyvalue(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon onClick={searchSubmitHandler} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    {properties.length === 0 ? (
                      <span
                        style={{
                          display: "block",
                          padding: "30px 0",
                          fontSize: "1.5rem",
                          flex: ".9",
                          textAlign: "center",
                        }}
                      >
                        No Product Found ....
                      </span>
                    ) : (
                      <div
                        className="products"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          flex: ".9",
                        }}
                      >
                        <div className="row">
                          {properties &&
                            properties.map((property) => (
                              <div className="col-md-4" key={property.id}>
                                <PropertyCard
                                  property={property}
                                  className="card"
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="paginationClass">
                  <Pagination
                    className="pagination"
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={propertiesCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Properties;
