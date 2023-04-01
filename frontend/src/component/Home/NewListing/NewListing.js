// NewListing component
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopListings } from "../../../actions/PropertyActions";
import React from "react";
import PropertyCard from "../../Common/CardComponent/PropertyCard";
const NewListing = () => {
  const dispatch = useDispatch();

  const { loading, error, topListings: properties } = useSelector(
    (state) => state.topListings
  );

  useEffect(() => {
    dispatch(getTopListings());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <h2>Top Listings</h2>
          <div className="row">
            {properties &&
              properties.map((property) => (
                <div className="col-md-4" key={property.id}>
                  <PropertyCard property={property} className="card"/>
                </div>
              ))}
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
