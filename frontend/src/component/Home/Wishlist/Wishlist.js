import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../more/Loader";
import {
  getWishlist,
  compareWishlistProperties,
} from "../../../actions/WistlistAction";
import PropertyCard from "../../Common/CardComponent/PropertyCard";
// import CompareTable from "./CompareTable";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlistProperties, loading } = useSelector(
    (state) => state.wishlistProperties
  );

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {wishlistProperties && wishlistProperties.length > 0 ? (
        <div className="row">
          {wishlistProperties.map((wish) => (
            <div className="col-md-3" key={wish.id}>
              <PropertyCard property={wish}  user={wish.user}/>
            </div>
          ))}
          <div className="col-md-12">
            <button >Compare</button>
          </div>
        </div>
      ) : (
        <p>Wishlist is empty</p>
      )}
      {/* {showTable && <CompareTable />} */}
    </div>
  );
};

export default Wishlist;
