// NewListing component
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopListings } from "../../../actions/PropertyActions";
import React from "react";
import PropertyCard from "../../Common/CardComponent/PropertyCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const NewListing = () => {
  const dispatch = useDispatch();

  const { loading, error, topListings: properties } = useSelector(
    (state) => state.topListings
  );

  useEffect(() => {
    dispatch(getTopListings());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          {/* <h2>Top Listings</h2>
          <div className="row">
            {properties &&
              properties.map((property) => (
                <div className="col-md-4" key={property.id}>
                  <PropertyCard property={property} className="card" />
                </div>
              ))}
          </div> */}
          <div className="container my-4">
            <div class="row mb-3 align-items-center">
              <div class="col-lg-6">
                <div class=" headings">
                  New Listing <span className="rentSell">PROPERTIES</span>
                </div>
              </div>
              <div class="col-lg-6 text-lg-end">
                <Link to="/properties">
                  <button class="custom-btn btn-3">
                    <span>View Properties</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="row">
              <Carousel
                showDots={true}
                responsive={responsive}
              >
                {properties &&
                  properties.map((property) => (
                    <div className="pe-5">
                      <PropertyCard property={property} className="card" />
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewListing;
{
  /* <div className="topListing">
  <div className="row">
    <div className="col-md-"></div>
  </div>
</div>; */
}
