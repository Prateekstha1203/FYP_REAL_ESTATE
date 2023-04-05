// import React, { useEffect, useState } from "react";
// import Footer from "../Common/footer/Footer";
// import Header from "../Common/navbar/Header";
// import { useSelector, useDispatch } from "react-redux";
// import Loading from "../../more/Loader";
// import PropertyCard from "../Common/CardComponent/PropertyCard";
// import { getProperty } from "../../actions/PropertyActions";
// import Pagination from "react-js-pagination";
// import "./Properties.css";
// import Typography from "@material-ui/core/Typography";
// import MetaData from "../../more/Metadata";

// const categories = ["All", "Banglow", "Villa", "Apartment"];
//  const propertyTypes = ["All","Rent","Sale"];
// const Properties = ({ match }) => {
//   const dispatch = useDispatch();

//   const [currentPage, setCurrentPage] = useState(1);

//   const [category, setCategory] = useState("");
//    const [propertyType, setPropertyType] = useState("");
//   const {
//     properties,
//     loading,
//     error,
//     propertiesCount,
//     resultPerPage,
//   } = useSelector((state) => state.properties);

//   const keyword = match.params.keyword;

//   const setCurrentPageNo = (e) => {
//     setCurrentPage(e);
//   };

//   useEffect(() => {
//     if (category === "All" && propertyType === "All") {
//       dispatch(getProperty(keyword, currentPage));
//     } else if (category === "All") {
//       dispatch(getProperty(keyword, currentPage, "", propertyType));
//     } else if (propertyType === "All") {
//       dispatch(getProperty(keyword, currentPage, category, ""));
//     } else {
//       dispatch(getProperty(keyword, currentPage, category, propertyType));
//     }
//   }, [dispatch, keyword, currentPage, category, error, propertyType]);

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           <MetaData title="Products" />
//           <Header />
//           <div>
//             {properties.length === 0 ? (
//               ""
//             ) : (
//               <h2
//                 style={{
//                   textAlign: "center",
//                   borderBottom: "1px solid rgba(21,21,21,0.5)",
//                   width: "20vmax",
//                   fontSize: "1.4vmax",
//                   fontFamily: "Poppins,sans-serif",
//                   margin: "3vmax auto",
//                   color: "rgb(0, 0, 0, 0.7)",
//                 }}
//               >
//                 Featured Products
//               </h2>
//             )}
//             <div
//               className="sidebar__product"
//               style={{
//                 display: "flex",
//                 flex: 1,
//               }}
//             >
//               <div
//                 className="sidebar__products"
//                 style={{
//                   border: "1px solid #999",
//                   margin: "1vmax",
//                   flex: ".177",
//                 }}
//               >
//                 <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
//                   CHOOSE CATEGORIES
//                 </Typography>
//                 <ul
//                   className="categoryBox"
//                   style={{
//                     boxSizing: "inherit",
//                   }}
//                 >
//                   {categories.map((category) => (
//                     <li
//                       className="category-link"
//                       key={category}
//                       onClick={() => setCategory(category)}
//                       type="checkbox"
//                     >
//                       {category}
//                     </li>
//                   ))}
//                 </ul>
//                 <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
//                   Property Type
//                 </Typography>
//                 <ul
//                   className="categoryBox"
//                   style={{
//                     boxSizing: "inherit",
//                   }}
//                 >
//                   {propertyTypes.map((propertyType) => (
//                     <li
//                       className="category-link"
//                       key={propertyType}
//                       onClick={() => setPropertyType(propertyType)}
//                       type="checkbox"
//                     >
//                       {propertyType}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {properties.length === 0 ? (
//                 <span
//                   style={{
//                     display: "block",
//                     padding: "30px 0",
//                     fontSize: "1.5rem",
//                     flex: ".9",
//                     textAlign: "center",
//                   }}
//                 >
//                   No Product Found ....
//                 </span>
//               ) : (
//                 <div
//                   className="products"
//                   style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     flex: ".9",
//                   }}
//                 >
//                   <div className="row">
//                     {properties &&
//                       properties.map((property) => (
//                         <div className="col-md-4" key={property.id}>
//                           <PropertyCard property={property} className="card" />
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div
//               className="pagination__box"
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 margin: "6vmax",
//               }}
//             >
//               <Pagination
//                 activePage={currentPage}
//                 itemsCountPerPage={resultPerPage}
//                 totalItemsCount={propertiesCount}
//                 onChange={setCurrentPageNo}
//                 nextPageText="Next"
//                 prevPageText="Prev"
//                 firstPageText="First"
//                 lastPageText="Last"
//                 itemClass="page-item"
//                 linkClass="page-link"
//                 activeClass="pageItemActive"
//                 activeLinkClass="pageLinkActive"
//               />
//             </div>
//           </div>
//           <Footer />
//         </>
//       )}
//     </>
//   );
// };

// export default Properties;

import React, { useEffect, useState } from "react";
import Footer from "../Common/footer/Footer";
import Header from "../Common/navbar/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import PropertyCard from "../Common/CardComponent/PropertyCard";
import { getProperty } from "../../actions/PropertyActions";
import Pagination from "react-js-pagination";
import "./Properties.css";
import Typography from "@material-ui/core/Typography";
import MetaData from "../../more/Metadata";

const categories = ["All", "Banglow", "Villa", "Apartment"];
const propertyTypes = ["All", "Rent", "Sale"];
const Properties = ({ match }) => {
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
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <Header />
          <div>
            {properties.length === 0 ? (
              ""
            ) : (
              <div>

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
              </div>
            )}

            <div
              className="sidebar__product"
              style={{
                display: "flex",
                flex: 1,
              }}
            >
              <div
                className="sidebar__products"
                style={{
                  border: "1px solid #999",
                  margin: "1vmax",
                  flex: ".177",
                }}
              >
                <Typography variant="h6">Category</Typography>
                {categories.map((category) => (
                  <div key={category}>
                    <label>
                      <input
                        type="checkbox"
                        name={category}
                        checked={categoryCheckboxes[category]}
                        onChange={handleCategoryCheckboxChange}
                      />
                      {category}
                    </label>
                  </div>
                ))}
                <ul
                  className="categoryBox"
                  style={{
                    boxSizing: "inherit",
                  }}
                >
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                      type="checkbox"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <Typography variant="h6">Property Type</Typography>
                {propertyTypes.map((propertyType) => (
                  <div key={propertyType}>
                    <label>
                      <input
                        type="checkbox"
                        name={propertyType}
                        checked={propertyTypeCheckboxes[propertyType]}
                        onChange={handlePropertyTypeCheckboxChange}
                      />
                      {propertyType}
                    </label>
                  </div>
                ))}
                <ul
                  className="categoryBox"
                  style={{
                    boxSizing: "inherit",
                  }}
                >
                  {propertyTypes.map((propertyType) => (
                    <li
                      className="category-link"
                      key={propertyType}
                      onClick={() => setPropertyType(propertyType)}
                      type="checkbox"
                    >
                      {propertyType}
                    </li>
                  ))}
                </ul>
              </div>

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
                          <PropertyCard property={property} className="card" />
                        </div>
                      ))}
                  </div>
                </div>
              )}
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
