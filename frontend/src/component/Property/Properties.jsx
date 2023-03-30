import React, { useEffect, useState } from "react";
import Footer from "../Common/footer/Footer";
import Header from "../Common/navbar/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import PropertyCard from "./PropertyCard";
import { getProperty } from "../../actions/PropertyActions";
import Pagination from "react-js-pagination";
import "./Properties.css";
import Typography from "@material-ui/core/Typography"
// import { useAlert } from "react-alert";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Men",
  "Women"
]

const Properties = ({ match }) => {
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <Header />
          <div>
            {properties.length === 0 ?
              ""
              :
              <h2
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid rgba(21,21,21,0.5)",
                  width: "20vmax",
                  fontSize: "1.4vmax",
                  fontFamily: "Poppins,sans-serif",
                  margin: "3vmax auto",
                  color: "rgb(0, 0, 0, 0.7)",
                }}
              >
                Featured Products
              </h2>
            }
            <div className="sidebar__product" style={{
              display: "flex",
              flex: 1,
            }}>
              <div className="sidebar__products" style={{
                border: "1px solid #999",
                margin: "1vmax",
                flex: ".177"
              }}>
                <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>CHOOSE CATEGORIES</Typography>
                <ul className="categoryBox" style={{
                  boxSizing: "inherit"
                }}>
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                      type="checkbox">
                      {category}
                    </li>
                  ))}
                </ul>
                <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>QUICK LINKS</Typography>
                
              </div>

              {properties.length === 0 ?
                <span style={{
                  display: "block",
                  padding: "30px 0",
                  fontSize: "1.5rem",
                  flex: ".9",
                  textAlign: "center"
                }}>No Product Found ....</span>
                :
                <div
                  className="products"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    flex: ".9"
                  }}
                >
                  {properties &&
                    properties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
              }

            </div>

            <div
              className="pagination__box"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "6vmax",
              }}
            >
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={propertiesCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Properties;