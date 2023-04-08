import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRentalProperties } from "../../../actions/PropertyActions";
import React from "react";
import PropertyCard from "../../Common/CardComponent/PropertyCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./RentSale.css";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";
const RentalProperties = () => {
  const dispatch = useDispatch();

  const { loading, error, rentalProperties: properties } = useSelector(
    (state) => state.rentalProperties
  );

  useEffect(() => {
    dispatch(getRentalProperties());
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
    <div className="rentGroup">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="container my-4">
            <div class="row mb-3 align-items-center">
              <div class="col-lg-6">
                <div class=" heading">
                  Properties For <span className="rentSell">RENT</span>
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

export default RentalProperties;
